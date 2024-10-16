import React from "react";
import TodoListItem from "./TodoListItem";
import propTypes from "prop-types";

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

TodoList.propTypes = {
  todoList: propTypes.func.isRequired,
  onRemoveTodo: propTypes.func.isRequired,
};

export default TodoList;

