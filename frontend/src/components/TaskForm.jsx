import { useEffect, useState } from "react";
import {toast } from 'react-hot-toast'
function TaskForm({ addTask, updateTask, editingTask }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Pending",
  });

  useEffect(() => {
    if (editingTask) {
      setForm(editingTask);
    } else {
      setForm({
        title: "",
        description: "",
        status: "Pending",
      });
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.description.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    editingTask ? updateTask(form) : addTask(form);

    setForm({
      title: "",
      description: "",
      status: "Pending",
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          {editingTask ? "Update Task" : "Create New Task"}
        </h2>

        <div className="space-y-5">
          <input
            type="text"
            placeholder="Task Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full rounded-xl border-2 border-gray-200 p-4 outline-none focus:border-indigo-500 transition"
          />

          <textarea
            rows="4"
            placeholder="Task Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            className="w-full rounded-xl border-2 border-gray-200 p-4 outline-none resize-none focus:border-indigo-500 transition"
          />

          <select
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value,
              })
            }
            className="w-full rounded-xl border-2 border-gray-200 p-4 outline-none focus:border-indigo-500 transition"
          >
            <option>Pending</option>
            <option>Completed</option>
          </select>

          <button className="w-full py-4 rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:scale-[1.02] hover:shadow-xl transition">
            {editingTask ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
