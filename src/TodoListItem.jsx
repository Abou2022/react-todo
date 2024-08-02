import React from "react";

const TodoListItem = ({ title, onRemoveTodo, id }) => {
  return (
    <div>
      <li>
        {title}
        <button onClick={() => onRemoveTodo(id)}>Remove</button>{" "}
      </li>
    </div>
  );
};

export default TodoListItem;
