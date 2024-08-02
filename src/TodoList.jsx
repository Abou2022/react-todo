import React from "react";
import TodoListItem from "./TodoListItem";

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

export default TodoList;
