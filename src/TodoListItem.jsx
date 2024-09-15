import React from "react";
import style from "./TodoListItem.module.css";

const TodoListItem = ({ title, onRemoveTodo, id }) => {
  return (
    <li className={style.ListItem}>
      {title}
      <button onClick={() => onRemoveTodo(id)}>Remove</button>
    </li>
  );
};

export default TodoListItem;

