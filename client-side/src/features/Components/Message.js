import React from "react";

const Message = (props) => {
  const style = () => {
    let baseClass = "alert ";
    if (props.message.mesError) {
      baseClass = baseClass + "alert-danger";
    } else {
      baseClass = baseClass + "alert-primary";
    }
    return baseClass + " text-center";
  };
  return (
    <div className={style()} role="alert">
      {props.message.mesBody}
    </div>
  );
};

export default Message;
