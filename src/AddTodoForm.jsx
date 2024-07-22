import React, { useState } from "react";

const AddTodoForm = (props) => {
  const [todoTitle, setTodoTitle] = useState("");

  function handleTitleChange(event) {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }

  function handleAddTodo(event) {
    event.preventDefault();
    const form = event.target;
    props.onAddTodo(todoTitle);
    form.reset();
  }
  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <label htmlFor="todoTitle">Title </label>
        <input
          value={todoTitle}
          onChange={handleTitleChange}
          name="title"
          type="text"
          id="todoTitle"
        />
        <button>Add</button>
      </form>
    </div>
  );
};

export default AddTodoForm;
