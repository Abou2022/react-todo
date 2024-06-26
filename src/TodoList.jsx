import React from "react";

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
        {todoList.map(function (todolists) {
          return <li key={todoList.id}>{todolists.title}</li>;
        })}
      </ul>
    </>
  );
};

export default TodoList;
