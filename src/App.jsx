import { useEffect, useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

function App() {
  const existingTodo = JSON.parse(localStorage.getItem("savedTodoList"));
  const [todoList, setTodoList] = useState(existingTodo);

  useEffect(() => {
    const todoListString = JSON.stringify(todoList);
    localStorage.setItem("savedTodoList", todoListString);
  }, [todoList]);

  function addTodo(newTodo) {
    setTodoList((previousTodoList) => [...previousTodoList, newTodo]);
  }

  return (
    <>
      <div>
        <h1>Todo List</h1>
        <AddTodoForm onAddTodo={addTodo} />
        <TodoList todoList={todoList} />
      </div>
    </>
  );
}

export default App;
