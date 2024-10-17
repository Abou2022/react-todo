import React, { useEffect, useRef } from "react";
import propTypes from "prop-types";

const InputWithLabel = ({ children, todoTitle, handleTitleChange }) => {
  //useref can be used to store DOM elements in state
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <div>
      <label htmlFor="todoTitle">{children}</label>
      <input
        value={todoTitle}
        onChange={handleTitleChange}
        name="title"
        type="text"
        id="todoTitle"
        ref={inputRef}
      />
    </div>
  );
};

InputWithLabel.propTypes = {
  handleTitleChange: propTypes.func.isRequired,
  todoTitle: propTypes.string.isRequired,
};

export default InputWithLabel;

