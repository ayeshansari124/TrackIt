import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import api from "./services/api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("All");

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch {
      toast.error("Unable to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      await api.post("/tasks", task);
      toast.success("Task Added");
      fetchTasks();
    } catch {
      toast.error("Failed");
    }
  };

  const updateTask = async (task) => {
    try {
      await api.put(`/tasks/${task._id}`, task);
      toast.success("Task Updated");
      setEditingTask(null);
      fetchTasks();
    } catch {
      toast.error("Failed");
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      toast.success("Task Deleted");
      fetchTasks();
    } catch {
      toast.error("Failed");
    }
  };

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-cyan-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-6xl font-black tracking-tight text-slate-800">
            {" "}
            Track It
          </h1>

          <p className="text-lg text-gray-500 mt-4">
            Organize and track your work efficiently
          </p>
        </div>

        <TaskForm
          addTask={addTask}
          updateTask={updateTask}
          editingTask={editingTask}
        />

        <div className="flex justify-center gap-4 my-10 flex-wrap">
          <button
            onClick={() => setFilter("All")}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              filter === "All"
                ? "bg-indigo-600 text-white"
                : "bg-white shadow hover:bg-indigo-100"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("Pending")}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              filter === "Pending"
                ? "bg-yellow-500 text-white"
                : "bg-white shadow hover:bg-yellow-100"
            }`}
          >
            Pending
          </button>

          <button
            onClick={() => setFilter("Completed")}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              filter === "Completed"
                ? "bg-green-600 text-white"
                : "bg-white shadow hover:bg-green-100"
            }`}
          >
            Completed
          </button>
        </div>

        <TaskList
          tasks={filteredTasks}
          deleteTask={deleteTask}
          setEditingTask={setEditingTask}
        />
      </div>
    </div>
  );
}

export default App;
