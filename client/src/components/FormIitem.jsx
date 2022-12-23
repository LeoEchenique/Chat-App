import React from "react";

function FormItem({ props }) {
  return (
    <>
      {props && (
        <input
          type={props.type}
          placeholder={props.placeholder}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
        />
      )}
    </>
  );
}

export default FormItem;
