import React from "react";

function ModalActions({ children, className = "", ...props }) {
  const classes = `modal-actions${className ? ` ${className}` : ""}`;
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

export default ModalActions;