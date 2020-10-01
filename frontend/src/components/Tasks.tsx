import React from "react";

type Props = {
  task: {
    id: string;
    title: string;
    content: string;
  };
  setEditedTask: VoidFunction;
  deleteTask: VoidFunction;
};

const Tasks: React.FC<Props> = (props) => {
  return (
    <div>
      <li key={props.task.id}>
        {props.task.title}
        {props.task.content}
        <button onClick={() => props.setEditedTask}>編集</button>
        <button onClick={() => props.deleteTask}>削除</button>
      </li>
    </div>
  );
};

export default Tasks;
