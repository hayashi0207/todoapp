import React from "react";
import Buttons from "./IconButtons";

type Props = {
  task: {
    id: string;
    title: string;
    content: string;
  };
  setEditedTask: Function;
  deleteTask: Function;
};

const Tasks: React.FC<Props> = (props) => {
  return (
    <div>
      <li key={props.task.id}>
        {props.task.title}
        {props.task.content}
        <Buttons
          editedTask={props.task}
          isType="edit"
          crudTask={() => props.setEditedTask(props.task)}
        />
        <Buttons
          editedTask={props.task}
          isType="delete"
          crudTask={() => props.deleteTask(props.task.id)}
        />
      </li>
    </div>
  );
};

export default Tasks;
