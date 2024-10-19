import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function sortTodoByCreatedTimeAsc(objectA, objectB) {
  return new Date(objectA.createdTime) - new Date(objectB.createdTime);
}

function sortTodoByCreatedTimeDesc(objectA, objectB) {
  return new Date(objectB.createdTime) - new Date(objectA.createdTime);
}

function sortTodoByTitleAsc(objectA, objectB) {
  if (objectA.title < objectB.title) return -1;
  if (objectA.title > objectB.title) return 1;
  return 0;
}

function sortTodoByTitleDesc(objectA, objectB) {
  if (objectA.title < objectB.title) return 1;
  if (objectA.title > objectB.title) return -1;
  return 0;
}

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortAscByCreatedTime, setSortAscByCreatedTime] = useState(true);
  const [sortAscByTitle, setSortAscByTitle] = useState(true);

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
        createdTime: data.records[0].createdTime,
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
        return {
          id: record.id,
          title: record.fields.title,
          createdTime: record.createdTime,
        };
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

  // My sort functions
  function sortTodoByCreatedTime(todo) {
    return todo.sort((objectA, objectB) => {
      if (sortAscByCreatedTime) {
        return sortTodoByCreatedTimeAsc(objectA, objectB);
      } else {
        return sortTodoByCreatedTimeDesc(objectA, objectB);
      }
    });
  }

  function sortTodoByTitle(todo) {
    return todo.sort((objectA, objectB) => {
      if (sortAscByTitle) {
        return sortTodoByTitleAsc(objectA, objectB);
      } else {
        return sortTodoByTitleDesc(objectA, objectB);
      }
    });
  }

  function handleSortByCreatedTimeClick() {
    setTodoList((prevTodo) => sortTodoByCreatedTime(prevTodo));
    setSortAscByCreatedTime(!sortAscByCreatedTime);
  }

  function handleSortByTitleClick() {
    setTodoList((prevTodo) => sortTodoByTitle(prevTodo));
    setSortAscByTitle(!sortAscByTitle);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <section className="section">
                <h1>Todo List</h1>

                <div className="sort-button-container">
                  <button
                    onClick={handleSortByCreatedTimeClick}
                    className="sort-button"
                  >
                    Toggle Sort by Created Time
                  </button>
                  <button
                    onClick={handleSortByTitleClick}
                    className="sort-button"
                  >
                    Toggle Sort by Title
                  </button>
                </div>

                <AddTodoForm onAddTodo={addTodo} />
                {isLoading ? (
                  <p>Loading ...</p>
                ) : (
                  <TodoList onRemoveTodo={removeTodo} todoList={todoList} />
                )}
              </section>
            </main>
          }
        />
        <Route
          path="/new"
          element={
            <div>
              <h1>New ToDo List</h1>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

