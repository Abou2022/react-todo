import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import propTypes from "prop-types";
import styles from "./AddTodoForm.module.css";

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
    <form onSubmit={handleAddTodo} className={styles.form}>
      <InputWithLabel
        todoTitle={todoTitle}
        handleTitleChange={handleTitleChange}
      >
        Add toDO!
      </InputWithLabel>
      <button type="submit" className={styles.button}>
        Add
      </button>
    </form>
  );
};

AddTodoForm.propTypes = {
  onAddTodo: propTypes.func.isRequired,
};

export default AddTodoForm;

