import { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "../components/TaskCard.jsx";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function Dashboard() {
  const token = localStorage.getItem("token");

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // =========================
  // FETCH TASKS
  // =========================
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // LOAD TASKS
  // =========================
  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, []);

  // =========================
  // REALTIME SOCKET
  // =========================
  useEffect(() => {
    socket.on("taskUpdated", () => {
      if (token) {
        fetchTasks();
      }
    });

    return () => socket.off("taskUpdated");
  }, []);

  // =========================
  // CREATE TASK
  // =========================
  const createTask = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // UPDATE TASK
  // =========================
  const updateTask = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // DELETE TASK
  // =========================
  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };
return (
  <div
    style={{
      maxWidth: "900px",
      margin: "0 auto",
      padding: "30px",
    }}
  >
    <h1
      style={{
        textAlign: "center",
        marginBottom: "30px",
      }}
    >
      🚀 Task Dashboard
    </h1>

    <div
      style={{
        background: "#ffffff",
        padding: "25px",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        marginBottom: "30px",
      }}
    >
      <h2>Create Task</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />
      <br />

      <button
        onClick={createTask}
        style={{
          background: "#2563eb",
          color: "white",
          padding: "12px 20px",
          borderRadius: "10px",
          fontSize: "16px",
        }}
      >
        Add Task
      </button>
    </div>

    <h2 style={{ marginBottom: "20px" }}>Your Tasks</h2>

    {tasks.length === 0 ? (
      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <p>No tasks yet</p>
      </div>
    ) : (
      tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onUpdate={updateTask}
          onDelete={deleteTask}
        />
      ))
    )}
  </div>
);
}