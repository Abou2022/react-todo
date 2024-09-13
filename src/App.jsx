import { useEffect, useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import styles from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function postData(newToDoTitle) {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              title: newToDoTitle,
            },
          },
        ],
      }),
    };

    const url = ` https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const data = await response.json();

      const newTodo = {
        title: data.records[0].fields.title,
        id: data.records[0].id,
      };
      setTodoList([newTodo, ...todoList]);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  async function getData() {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    const url = ` https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const data = await response.json();

      const todos = data.records.map((record) => {
        return { id: record.id, title: record.fields.title };
      });
      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  useEffect(() => {
    getData();
  }, []);

  function addTodo(newToDoTitle) {
    postData(newToDoTitle);
  }

  function removeTodo(id) {
    const filterTodo = todoList.filter((todo) => todo.id !== id);
    setTodoList(filterTodo);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <main className={styles.main}>
              <div>
                <h1>Todo List</h1>
                <AddTodoForm onAddTodo={addTodo} />
                {isLoading ? (
                  <p>Loading ...</p>
                ) : (
                  <TodoList onRemoveTodo={removeTodo} todoList={todoList} />
                )}
              </div>
            </main>
          }
        ></Route>
        <Route
          path="/new"
          element={
            <div>
              <h1>New ToDo List</h1>
            </div>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

