import React from "react";
import propTypes from "prop-types";

const TodoListItem = ({ title, onRemoveTodo, id }) => {
  return (
    <li className="todo-item">
      {title}
      <button onClick={() => onRemoveTodo(id)}>Remove</button>
    </li>
  );
};

TodoListItem.propTypes = {
  title: propTypes.func.isRequired,
  onRemoveTodo: propTypes.func.isRequired,
  id: propTypes.func.isRequired,
};

export default TodoListItem;

