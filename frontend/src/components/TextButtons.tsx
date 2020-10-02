import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginTop: 100,
      opacity: 0.5,
    },
  })
);

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
  const classes = useStyles();

  return (
    <div>
      <div className={classes.button}>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => props.crudTask(props.editedTask)}
          fullWidth
        >
          {props.text}
        </Button>
      </div>
    </div>
  );
};

export default Buttons;
