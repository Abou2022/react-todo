import React from "react";

const AddTodoForm = (props) => {
  function handleAddTodo(event) {
    event.preventDefault();
    const form = event.target;
    const input = form.querySelector("input");
    const inputValue = input.value;
    console.log(inputValue);
    props.onAddTodo(inputValue);
    form.reset();
  }
  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <label htmlFor="todoTitle">Title </label>
        <input name="title" type="text" id="todoTitle" />
        <button>Add</button>
      </form>
    </div>
  );
};

export default AddTodoForm;
