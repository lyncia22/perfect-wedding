import { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Book the venue", completed: true },
    { id: 2, name: "Send invites", completed: false },
    { id: 3, name: "Hire photographer", completed: false },
  ]);

  const addTask = (name) => {
    const newTask = { id: Date.now(), name, completed: false };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

// Hook to use in any component
export const useTasks = () => useContext(TaskContext);
export default TaskContext;