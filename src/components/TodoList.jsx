import React from "react";
import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types";

const TodoList = ({ todoList, onRemoveTodo }) => {
  return (
    <ul>
      {todoList.map(({ id, title }) => (
        <TodoListItem
          key={id}
          title={title}
          onRemoveTodo={onRemoveTodo}
          id={id}
        />
      ))}
    </ul>
  );
};

TodoList.PropTypes = {
  todoList: PropTypes.func.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoList;

