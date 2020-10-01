import React from "react";

type Props = {
  crudTask: Function;
  editedTask: {
    id: string;
    title: string;
    content: string;
  };
  text: string;
};

const Buttons = (props: Props) => {
  return (
    <div>
      <button onClick={() => props.crudTask(props.editedTask)}>
        {props.text}
      </button>
    </div>
  );
};

export default Buttons;
