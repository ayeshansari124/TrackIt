function TaskCard({ task, deleteTask, setEditingTask }) {
  const date = new Date(task.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
      {/* Top */}

      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{task.title}</h2>

          <p className="text-gray-500 text-sm mt-1">{date}</p>
        </div>

        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            task.status === "Completed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {task.status}
        </span>
      </div>

      {/* Description */}

      <p className="text-gray-600 leading-7 my-6">{task.description}</p>

      {/* Buttons */}

      <div className="flex gap-4">
        <button
          onClick={() => setEditingTask(task)}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition hover:scale-105 active:scale-95 duration-300"
        >
          ✏ Edit
        </button>

        <button
          onClick={() => deleteTask(task._id)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition hover:scale-105 active:scale-95 duration-300"
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
