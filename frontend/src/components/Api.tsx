import React, { useState, useEffect } from "react";
import axios from "axios";
import Tasks from "./Tasks";

const Api: React.FC = () => {
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
      .post(`http://127.0.0.1:8000/api/todolist/${task.id}`, task, {
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
    <div>
      <ul>
        {tasks.map((task: Task) => (
          <Tasks
            task={task}
            setEditedTask={() => setEditedTask(task)}
            deleteTask={() => deleteTask(task.id)}
          />
        ))}
      </ul>
      <input
        type="text"
        name="title"
        value={editedTask.title}
        onChange={handleInputChange}
        placeholder="タイトル"
        required
      />
      <br />
      <textarea
        name="content"
        value={editedTask.content}
        onChange={handleContentChange}
        placeholder="内容"
        required
      />
      <br />
      {editedTask.id ? (
        <button onClick={() => updateTask(editedTask)}>更新</button>
      ) : (
        <button onClick={() => createTask(editedTask)}>追加</button>
      )}
    </div>
  );
};

export default Api;