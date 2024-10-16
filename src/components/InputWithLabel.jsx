import React, { useEffect, useRef } from "react";
import propTypes from "prop-types";

const InputWithLabel = (props) => {
  //useref can be used to store DOM elements in state
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <div>
      <label htmlFor="todoTitle">{props.children}</label>
      <input
        value={props.todoTitle}
        onChange={props.handleTitleChange}
        name="title"
        type="text"
        id="todoTitle"
        ref={inputRef}
      />
    </div>
  );
};

InputWithLabel.propTypes = {
  props: propTypes.func.isRequired,
};

export default InputWithLabel;

