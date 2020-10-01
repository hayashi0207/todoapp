import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
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
      <div className={classes.root}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => props.crudTask(props.editedTask)}
        >
          {props.text}
        </Button>
      </div>
    </div>
  );
};

export default Buttons;
