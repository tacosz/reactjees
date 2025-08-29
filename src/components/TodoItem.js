// src/components/TodoItem.js

import React from "react";

const TodoItem = ({ todo, onToggleCompleted, onDeleteTodo, onEditTodo }) => {
  return (
    <li
      style={{
        marginBottom: "10px",
        border: "1px solid white",
        padding: "10px",
        borderRadius: "8px",
        backgroundColor: todo.completed ? "#000080" : "#000050", // navy background
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        color: "white", // white text for better contrast
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <h3
          style={{
            margin: 0,
            textDecoration: todo.completed ? "line-through" : "none",
          }}
        >
          {todo.task}
        </h3>
        <div style={{ display: "flex", gap: "5px" }}>
          <button
            onClick={() => onToggleCompleted(todo.id, todo.completed)}
            style={{
              padding: "5px 10px",
              borderRadius: "4px",
              backgroundColor: todo.completed ? "#ff6b6b" : "#4CAF50",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            {todo.completed ? "Belum Selesai" : "Selesai"}
          </button>
          <button
            onClick={() => onEditTodo(todo)}
            style={{
              padding: "5px 10px",
              borderRadius: "4px",
              backgroundColor: "#FFA500",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Edit
          </button>
          <button
            onClick={() => onDeleteTodo(todo.id)}
            style={{
              padding: "5px 10px",
              borderRadius: "4px",
              backgroundColor: "tomato",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Hapus
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;