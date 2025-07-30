import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // Ensure this exports `supabase` correctly

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState(null);

  // Fetch tasks from Supabase
  useEffect(() => {
    const fetchTasks = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setUserId(user.id);

      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      if (error) console.error("Error fetching tasks:", error);
      else setTasks(data);
    };

    fetchTasks();
  }, []);

  // Add task
  const addTask = async (name) => {
    if (!userId) return;

    const { data, error } = await supabase
      .from("tasks")
      .insert([{ name, completed: false, user_id: userId }])
      .select()
      .maybeSingle();

    if (error) console.error("Add task error:", error);
    else setTasks((prev) => [...prev, data]);
  };

  // Toggle task completion
  const toggleTask = async (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const { data, error } = await supabase
      .from("tasks")
      .update({ completed: !task.completed })
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) console.error("Toggle task error:", error);
    else {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) console.error("Delete task error:", error);
    else setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
