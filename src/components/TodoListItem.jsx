import React from "react";
import propTypes from "prop-types";
import style from "./TodoListItem.module.css";

const TodoListItem = ({ title, onRemoveTodo, id }) => {
  return (
    <li className={style.ListItem}>
      {title}
      <button onClick={() => onRemoveTodo(id)}>Remove</button>
    </li>
  );
};

TodoListItem.propTypes = {
  title: propTypes.string.isRequired,
  onRemoveTodo: propTypes.func.isRequired,
  id: propTypes.string.isRequired,
};

export default TodoListItem;

