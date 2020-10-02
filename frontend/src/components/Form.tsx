import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      marginTop: 100,
      marginBottom: 50,
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
      <form className={classes.form} noValidate autoComplete="off">
        <div>
          <TextField
            id="standard-basic"
            label="Title"
            type="text"
            name="title"
            value={props.editedTask.title}
            onChange={props.handleInputChange}
            fullWidth
            required
          />
        </div>
      </form>
      <form className={classes.form} noValidate autoComplete="off">
        <div>
          <TextField
            id="standard-basic"
            label="Content"
            name="content"
            value={props.editedTask.content}
            onChange={props.handleContentChange}
            multiline={true}
            rows={8}
            fullWidth
            required
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
