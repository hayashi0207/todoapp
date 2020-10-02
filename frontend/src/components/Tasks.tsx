import React from "react";
import IconButtons from "./IconButtons";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles({
  root: {
    marginBottom: 5,
  },
});

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
  const classes = useStyles();
  return (
    <li className={classes.root} key={props.task.id}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <FormControlLabel
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<Checkbox style={{ opacity: 0.5 }} />}
            label={props.task.title}
          />
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="textSecondary">
            <div className="task-content">{props.task.content}</div>
          </Typography>
          <div className="icon-buttons">
            <IconButtons
              editedTask={props.task}
              isType="edit"
              crudTask={() => props.setEditedTask(props.task)}
            />
          </div>
          <div className="icon-buttons">
            <IconButtons
              editedTask={props.task}
              isType="delete"
              crudTask={() => props.deleteTask(props.task.id)}
            />
          </div>
        </AccordionDetails>
      </Accordion>
    </li>
  );
};

export default Tasks;
