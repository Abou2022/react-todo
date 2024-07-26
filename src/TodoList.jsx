import React from "react";
import TodoListItem from "./TodoListItem";

var todoList = [
  {
    id: 1,
    title: "Assignment not start",
  },
  {
    id: 2,
    title: "Assignment start",
  },
  {
    id: 3,
    title: "Assignment completed",
  },
];

const TodoList = () => {
  return (
    <>
      <ul>
        {todoList.map(function (props) {
          return <TodoListItem key={props.id} title={props.title} />;
        })}
      </ul>
    </>
  );
};

export default TodoList;
