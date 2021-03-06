import React, { useState, useEffect } from "react";
import axios from "axios";
import Tasks from "./Tasks";
import Form from "./Form";
import Buttons from "./TextButtons";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperLeft: {
      "& > *": {
        position: "absolute",
        top: 109,
        left: 320,
        zIndex: "0",
        width: theme.spacing(60),
        height: theme.spacing(80),
        backgroundColor: "#eeeeee",
      },
    },
    paperRight: {
      "& > *": {
        position: "absolute",
        top: 109,
        left: 850,
        zIndex: "0",
        width: theme.spacing(60),
        height: theme.spacing(80),
        backgroundColor: "#eeeeee",
      },
    },
  })
);

const Api: React.FC = () => {
  const classes = useStyles();

  interface Task {
    id: string;
    title: string;
    content: string;
  }
  interface SendTask {
    title: string;
    content: string;
  }

  const [tasks, setTasks] = useState<any>([]);
  const [editedTask, setEditedTask] = useState<Task>({
    id: "",
    title: "",
    content: "",
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/todolist/", {
        headers: {
          Authorization: "Token c1b7a43871127d3e4e9b88768d9bc18180be80a8",
        },
      })
      .then((res) => {
        setTasks(res.data);
      });
  }, []);
  const createTask = (task: Task) => {
    const sendTask: SendTask = {
      title: task.title,
      content: task.content,
    };
    axios
      .post("http://127.0.0.1:8000/api/todolist/", sendTask, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token c1b7a43871127d3e4e9b88768d9bc18180be80a8",
        },
      })
      .then((res) => {
        setTasks([...tasks, res.data]);
        setEditedTask({ id: "", title: "", content: "" });
      });
  };

  const updateTask = (task: Task) => {
    axios
      .put(`http://127.0.0.1:8000/api/todolist/${task.id}/`, task, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token c1b7a43871127d3e4e9b88768d9bc18180be80a8",
        },
      })
      .then((res) => {
        setTasks(
          tasks.map((task: Task) =>
            task.id === editedTask.id ? res.data : task
          )
        );
        setEditedTask({ id: "", title: "", content: "" });
      });
  };

  const deleteTask = (id: string) => {
    axios
      .delete(`http://127.0.0.1:8000/api/todolist/${id}/`, {
        headers: {
          Authorization: "Token c1b7a43871127d3e4e9b88768d9bc18180be80a8",
        },
      })
      .then((res) => {
        setTasks(tasks.filter((task: Task) => task.id !== id));
        if (editedTask.id === id) {
          setEditedTask({ id: "", title: "", content: "" });
        }
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setEditedTask({ ...editedTask, [name]: value });
  };

  return (
    <div className="App-content">
      <div className={classes.paperLeft}>
        <Paper elevation={3} />
      </div>
      <div className={classes.paperRight}>
        <Paper elevation={3} />
      </div>
      <div className="operation-area">
        <Form
          editedTask={editedTask}
          handleInputChange={handleInputChange}
          handleContentChange={handleContentChange}
        />
        {editedTask.id ? (
          <Buttons
            editedTask={editedTask}
            text="save"
            crudTask={() => updateTask(editedTask)}
          />
        ) : (
          <Buttons
            editedTask={editedTask}
            text="create"
            crudTask={() => createTask(editedTask)}
          />
        )}
      </div>
      <ul>
        {tasks.map((task: Task) => (
          <Tasks
            task={task}
            setEditedTask={() => setEditedTask(task)}
            deleteTask={() => deleteTask(task.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Api;
