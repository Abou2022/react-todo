import React from "react";
import TodoListItem from "./TodoListItem";

const TodoList = (props) => {
  return (
    <>
      <ul>
        {props.todoList.map(function (todo) {
          return <TodoListItem key={todo.id} title={todo.title} />;
        })}
      </ul>
    </>
  );
};

export default TodoList;
