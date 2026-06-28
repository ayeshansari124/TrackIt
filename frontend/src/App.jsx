import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import api from "./services/api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch {
      toast.error("Unable to fetch tasks");
    } finally {
      setLoading(false);
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
    if (!window.confirm("Delete this task?")) return;

    try {
      await api.delete(`/tasks/${id}`);
      toast.success("Task Deleted");
      fetchTasks();
    } catch {
      toast.error("Failed");
    }
  };

  const filteredTasks = tasks
    .filter((task) => (filter === "All" ? true : task.status === filter))
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()));

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const pending = tasks.filter((t) => t.status === "Pending").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-cyan-100 py-12 px-5">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-black text-center text-slate-800">
          Task It
        </h1>

        <p className="text-center text-gray-600 mt-3 text-lg">
          Organize and track your work like a pro.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white rounded-3xl shadow-xl p-6 text-center">
            <h3 className="text-gray-500">Total Tasks</h3>
            <h1 className="text-4xl font-bold mt-2">{total}</h1>
          </div>

          <div className="bg-yellow-100 rounded-3xl shadow-xl p-6 text-center">
            <h3 className="text-yellow-700">Pending</h3>
            <h1 className="text-4xl font-bold mt-2">{pending}</h1>
          </div>

          <div className="bg-green-100 rounded-3xl shadow-xl p-6 text-center">
            <h3 className="text-green-700">Completed</h3>
            <h1 className="text-4xl font-bold mt-2">{completed}</h1>
          </div>
        </div>

        <div className="my-10">
          <TaskForm
            addTask={addTask}
            updateTask={updateTask}
            editingTask={editingTask}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-5 mb-8">
          <input
            type="text"
            placeholder=" Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl p-4 mb-5 outline-none focus:border-indigo-500"
          />

          <div className="flex gap-3 flex-wrap">
            {["All", "Pending", "Completed"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`px-5 py-2 rounded-full transition font-semibold hover:scale-105 active:scale-95 duration-300${
                  filter === item
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 hover:bg-indigo-100"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-2xl font-semibold text-gray-600">
             Loading Tasks...
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            deleteTask={deleteTask}
            setEditingTask={setEditingTask}
          />
        )}
      </div>
    </div>
  );
}

export default App;
