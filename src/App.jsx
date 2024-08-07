import { useEffect, useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import "./App.css";

function App() {
  // const existingTodo = JSON.parse(localStorage.getItem("savedTodoList")) || [];
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingTodo =
          JSON.parse(localStorage.getItem("savedTodoList")) || [];
        const object = {
          data: {
            todoList: existingTodo,
          },
        };
        resolve(object);
      }, 2000);
    }).then((result) => {
      setTodoList(result.data.todoList);
    });
  }, []);

  useEffect(() => {
    const todoListString = JSON.stringify(todoList);
    localStorage.setItem("savedTodoList", todoListString);
  }, [todoList]);

  function addTodo(newTodo) {
    setTodoList((previousTodoList) => [...previousTodoList, newTodo]);
  }

  function removeTodo(id) {
    const filterTodo = todoList.filter((todo) => todo.id !== id);
    setTodoList(filterTodo);
  }

  return (
    <>
      <div>
        <h1>Todo List</h1>
        <AddTodoForm onAddTodo={addTodo} />
        <TodoList onRemoveTodo={removeTodo} todoList={todoList} />
      </div>
    </>
  );
}

export default App;
