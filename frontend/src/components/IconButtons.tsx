import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

type Props = {
  crudTask: Function;
  editedTask: {
    id: string;
    title: string;
    content: string;
  };
  isType: string;
};

const Buttons = (props: Props) => {
  return (
    <div>
      <button onClick={() => props.crudTask(props.editedTask)}>
        {props.isType === "edit" && <EditIcon />}
        {props.isType === "delete" && <DeleteIcon />}
      </button>
    </div>
  );
};

export default Buttons;
