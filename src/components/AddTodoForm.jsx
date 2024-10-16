import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import propTypes from "prop-types";

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
    <form onSubmit={handleAddTodo}>
      <InputWithLabel
        todoTitle={todoTitle}
        handleTitleChange={handleTitleChange}
      >
        Add toDO!
      </InputWithLabel>
      <button type="submit">Add</button>
    </form>
  );
};

AddTodoForm.propTypes = {
  onAddTodo: propTypes.func.isRequired,
};

export default AddTodoForm;

