import { useState } from "react";

// import "./App.css";
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

function App() {
  return (
    <>
      <div>
        <h1>Todo List</h1>
        <ul>
          {todoList.map(function (todolists) {
            return (
              <li key={todoList.id}>
                <span>{todolists.id + " "} </span>
                <span>{todolists.title}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
