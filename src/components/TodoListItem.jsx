import React from "react";
import PropTypes from "prop-types";

const TodoListItem = ({ title, onRemoveTodo, id }) => {
  return (
    <li className="todo-item">
      {title}
      <button onClick={() => onRemoveTodo(id)}>Remove</button>
    </li>
  );
};

TodoListItem.PropTypes = {
  title: PropTypes.func.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  id: PropTypes.func.isRequired,
};

export default TodoListItem;

