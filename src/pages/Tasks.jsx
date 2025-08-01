import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import "./Tasks.css";

import { FiCheckSquare, FiSquare, FiTrash2 } from "react-icons/fi";

export default function Tasks() {
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);

  // Get logged-in user on component mount
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
      else console.error("User not found", error);
    };
    getUser();
  }, []);

  // Fetch tasks whenever user changes (after login)
  const fetchTasks = async () => {
    if (!user?.id) return;
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (error) console.error("Error fetching tasks:", error.message);
    else setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  // Add new task handler
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!taskName.trim()) return;
    if (!user?.id) {
      console.error("User not found. Cannot add task.");
      return;
    }
    const { error } = await supabase.from("tasks").insert([
      {
        name: taskName,
        completed: false,
        user_id: user.id,
      },
    ]);
    if (error) console.error("Add task failed:", error.message);
    else {
      setTaskName("");
      fetchTasks();
    }
  };

  // Toggle completed status
  const toggleTask = async (task) => {
    const { error } = await supabase
      .from("tasks")
      .update({ completed: !task.completed })
      .eq("id", task.id)
      .eq("user_id", user.id);
    if (error) console.error("Toggle failed:", error.message);
    else fetchTasks();
  };

  // Delete task
  const deleteTask = async (taskId) => {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", taskId)
      .eq("user_id", user.id);
    if (error) console.error("Delete failed:", error.message);
    else fetchTasks();
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
        <h1>
          Wedding Tasks <FiCheckSquare />
        </h1>
        <p>
          Keep track of what needs to be done. Add to-do lists, mark tasks as
          complete, and stay on top of your wedding plans.
        </p>

        <form onSubmit={handleAddTask} className="tasks__form">
          <input
            type="text"
            placeholder="Add a new task..."
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="tasks__input"
          />
          <button type="submit" className="tasks__btn">
            Add Task
          </button>
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
                <span onClick={() => toggleTask(task)} className="task-name">
                  {task.completed ? (
                    <FiCheckSquare className="icon check-icon" />
                  ) : (
                    <FiSquare className="icon box-icon" />
                  )}{" "}
                  {task.name}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="task-delete-btn"
                  w
                  aria-label="Delete task"
                >
                  <FiTrash2 className="icon trash-icon" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
