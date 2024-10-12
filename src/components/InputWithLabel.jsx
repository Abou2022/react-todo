import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

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

InputWithLabel.PropTypes = {
  props: PropTypes.func.isRequired,
};

export default InputWithLabel;

