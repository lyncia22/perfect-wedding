import "./Tasks.css";
import { useState } from "react";

export default function Tasks() {
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskName.trim()) return;
    const newTask = { id: Date.now(), name: taskName, completed: false };
    setTasks([newTask, ...tasks]);
    setTaskName("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="tasks">
      <div className="tasks__image">
        <img
          src="https://i.pinimg.com/736x/c2/6b/98/c26b98340c8b3626ee235a6265ccb514.jpg"
          alt="Tasks"
        />
      </div>

      <div className="tasks__content">
        <h1>Wedding Tasks ✅</h1>
        <p>
          Keep track of what needs to be done. Add to-do lists, mark tasks as complete,
          and stay on top of your wedding plans.
        </p>
        <p>Planning your big day just got easier!</p>

        <form onSubmit={handleAddTask} className="tasks__form">
          <input
            type="text"
            placeholder="Add a new task..."
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <button type="submit">Add Task</button>
        </form>

        <div className="tasks__list">
          {tasks.length === 0 ? (
            <p>No tasks yet. Add something to plan your perfect day!</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`task-item ${task.completed ? "completed" : ""}`}
              >
                <span onClick={() => toggleTask(task.id)}>
                  {task.completed ? "✅" : "⬜"} {task.name}
                </span>
                <button onClick={() => deleteTask(task.id)}>🗑️</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
