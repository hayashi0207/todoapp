import React from "react";
import Buttons from "./IconButtons";
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
    width: "100%",
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
    <div key={props.task.id}>
      <div className={classes.root}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions1-content"
            id="additional-actions1-header"
          >
            <FormControlLabel
              aria-label="Acknowledge"
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
              control={<Checkbox />}
              label={props.task.title}
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="textSecondary">
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
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Tasks;
