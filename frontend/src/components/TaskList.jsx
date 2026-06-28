import TaskCard from "./TaskCard";

function TaskList({ tasks, deleteTask, setEditingTask }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center mt-14">

        <h2 className="text-2xl font-bold text-gray-700 mt-4">No Tasks Yet</h2>

        <p className="text-gray-500 mt-2">
          Add your first task to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          deleteTask={deleteTask}
          setEditingTask={setEditingTask}
        />
      ))}
    </div>
  );
}

export default TaskList;
