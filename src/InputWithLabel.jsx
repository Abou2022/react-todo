import React from "react";

const InputWithLabel = (props) => {
  return (
    <div>
      <label htmlFor="todoTitle">{props.label}</label>
      <input
        value={props.todoTitle}
        onChange={props.handleTitleChange}
        name="title"
        type="text"
        id="todoTitle"
      />
    </div>
  );
};

export default InputWithLabel;
