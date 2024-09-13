import React from "react";
import "./TodoListItem.module.css";

const TodoListItem = ({ title, onRemoveTodo, id }) => {
  return (
    <li className="todo-item">
      {title}
      <button onClick={() => onRemoveTodo(id)}>Remove</button>
    </li>
  );
};

export default TodoListItem;

