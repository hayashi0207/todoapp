import React from "react";

type Props = {
  editedTask: {
    title: string;
    content: string;
  };
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleContentChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const Form: React.FC<Props> = (props) => {
  return (
    <div>
      <input
        type="text"
        name="title"
        value={props.editedTask.title}
        onChange={props.handleInputChange}
        placeholder="タイトル"
        required
      />
      <br />
      <textarea
        name="content"
        value={props.editedTask.content}
        onChange={props.handleContentChange}
        placeholder="内容"
        rows={4}
        required
      />
      <br />
    </div>
  );
};

export default Form;
