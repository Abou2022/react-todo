import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function sortTodoAscending(objectA, objectB) {
  if (objectA < objectB) {
    return 1;
  } else if (objectA > objectB) {
    return -1;
  } else {
    return 0;
  }
}

function sortTodoDescending(objectA, objectB) {
  if (objectA < objectB) {
    return -1;
  } else if (objectA > objectB) {
    return 1;
  } else {
    return 0;
  }
}

function App() {
  const [todoList, setTodoList] = useState([]);
  const [sortAsc, setSortAsc] = useState(true);
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
    }/${
      import.meta.env.VITE_TABLE_NAME
    }?view=Grid%20view&sort[0][field]=title&sort[0][direction]=asc`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const data = await response.json();

      const todos = data.records.map((record) => {
        return { id: record.id, title: record.fields.title };
      });

      //Sorted
      const sortedTodo = sortTodo(todos);

      setTodoList(sortedTodo);
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

  function sortTodo(todo) {
    return todo.sort((objectA, objectB) => {
      if (sortAsc) {
        return sortTodoAscending(objectA.title, objectB.title);
      } else {
        return sortTodoDescending(objectA.title, objectB.title);
      }
    });
  }

  function handleSortToggleClick() {
    // const sortedTodo = sortTodo(todoList);
    // setTodoList(sortedTodo)
    setTodoList((prevTodo) => sortTodo(prevTodo));
    setSortAsc(!sortAsc);
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
                    onClick={handleSortToggleClick}
                    className="sort-button"
                  >
                    {" "}
                    Change Sorting Order
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

