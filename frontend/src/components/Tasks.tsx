import React from "react";

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
        <button onClick={() => props.setEditedTask(props.task)}>編集</button>
        <button onClick={() => props.deleteTask(props.task.id)}>削除</button>
      </li>
    </div>
  );
};

export default Tasks;
