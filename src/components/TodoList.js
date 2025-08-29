// src/components/TodoList.js

import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, onToggleCompleted, onDeleteTodo, onEditTodo }) => {
  if (todos.length === 0) {
    return <p>Tidak ada tugas yang ditemukan. Silakan tambahkan satu.</p>;
  }

  return (
    <ul style={{ 
      listStyleType: "none", 
      padding: "20px",
      backgroundColor: "#800000", // maroon background
      borderRadius: "10px",
      minHeight: "300px"
    }}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleCompleted={onToggleCompleted}
          onDeleteTodo={onDeleteTodo}
          onEditTodo={onEditTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;