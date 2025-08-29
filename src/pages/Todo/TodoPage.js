// src/pages/TodoPage.js

import React, { useState, useEffect, useCallback } from "react";
import TodoForm from "../../components/TodoForm.js";
import TodoList from "../../components/TodoList.js";
import SearchInput from "../../components/SearchInput.js";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editTodo, setEditTodo] = useState(null); // todo yang sedang diedit
  const [searchTerm, setSearchTerm] = useState("");


  const fetchTodos = useCallback((searchQuery) => {
    setLoading(true);
    const url = searchQuery
      ? `/api/todos?search=${encodeURIComponent(searchQuery)}`
      : "/api/todos";

    fetch(url)
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setTodos(data.todos);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setTodos([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // useEffect untuk debounce pencarian tidak berubah
  useEffect(() => {
    const timerId = setTimeout(() => {
      fetchTodos(searchTerm);
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchTerm, fetchTodos]);


  const handleAddTodo = (task) => {
    fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos([
          ...todos,
          { id: data.id, task: data.task, completed: false },
        ]);
      })
      .catch((err) => console.error("Error adding todo:", err));
  };

  // Handler untuk mulai edit
  const handleEditClick = (todo) => {
    setEditTodo(todo);
  };

  // Handler untuk update todo
  const handleUpdateTodo = (id, newTask) => {
    fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: newTask }),
    })
      .then((response) => {
        // Jika response kosong, tetap update dengan newTask
        if (response.status === 204) return {};
        return response.json();
      })
      .then((data) => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, task: (data && data.task) ? data.task : newTask } : todo
          )
        );
        setEditTodo(null);
      })
      .catch((err) => console.error("Error updating todo:", err));
  };

  const handleDeleteTodo = (id) => {
    fetch(`/api/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((err) => console.error("Error deleting todo:", err));
  };

  const handleToggleCompleted = (id, completed) => {
    fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !completed }),
    })
      .then(() => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !completed } : todo
          )
        );
      })
      .catch((err) => console.error("Error updating todo:", err));
  };

  if (loading) {
    return <div style={{ textAlign: "center" }}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", color: "red" }}>Error: {error}</div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <header style={{ textAlign: "center" }}>
        <h1>Aplikasi Todo List</h1>
        <TodoForm
          onAddTodo={handleAddTodo}
          editTodo={editTodo}
          onUpdateTodo={handleUpdateTodo}
          onCancelEdit={() => setEditTodo(null)}
        />
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <h2>Daftar Tugas Anda</h2>
        <TodoList
          todos={todos}
          onToggleCompleted={handleToggleCompleted}
          onDeleteTodo={handleDeleteTodo}
          onEditTodo={handleEditClick}
          onUpdateTodo={handleUpdateTodo}
        />
      </header>
    </div>
  );
};

export default TodoPage;