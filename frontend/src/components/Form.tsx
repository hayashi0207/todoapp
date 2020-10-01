import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  })
);
type Props = {
  editedTask: {
    title: string;
    content: string;
  };
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleContentChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const Form: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="Title"
          type="text"
          name="title"
          value={props.editedTask.title}
          onChange={props.handleInputChange}
          required
        />
        <br />
        <TextField
          id="standard-basic"
          label="Content"
          name="content"
          value={props.editedTask.content}
          onChange={props.handleContentChange}
          multiline={true}
          rows={5}
          required
        />
      </form>
    </div>
  );
};

export default Form;
