import React, { useState } from "react";

const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState("");

  const handleTitleChange = (event) => {
    setTodoTitle(event.target.value);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();

    onAddTodo(todoTitle);
    setTodoTitle("");
  };

  return (
    <form className="add-todo-form" onSubmit={handleAddTodo}>
      <input
        type="text"
        value={todoTitle}
        onChange={handleTitleChange}
        placeholder="Enter a new todo"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;

