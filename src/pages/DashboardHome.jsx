import "./DashboardHome.css";
import { useState } from "react";

export default function DashboardHome() {
  // Fake data for now; later you'll pull from your app state
  const [guests, setGuests] = useState(50);
  const [tasks, setTasks] = useState([
    { id: 1, name: "Book the venue", completed: true },
    { id: 2, name: "Send invites", completed: false },
    { id: 3, name: "Hire photographer", completed: false },
  ]);
  const [vendors, setVendors] = useState(3);

  // Calculate task completion %
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const taskProgress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="dashboard">
      {/* Hero Banner */}
      <div className="dashboard__hero">
        <img
          src="https://i.pinimg.com/736x/52/36/e4/5236e4673c530eff333867911d3becd4.jpg"
          alt="Wedding Hero"
        />
        <div className="dashboard__hero-text">
          <h1>Welcome to Your Wedding Planner 🎉</h1>
          <p>Plan your dream wedding with ease and joy!</p>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="dashboard__cards">
        <div className="dashboard__card">
          <h2>Guests</h2>
          <p>{guests}</p>
        </div>
        <div className="dashboard__card">
          <h2>Tasks</h2>
          <p>{totalTasks - completedTasks} pending</p>
        </div>
        <div className="dashboard__card">
          <h2>Vendors</h2>
          <p>{vendors}</p>
        </div>
      </div>

      {/* Task Progress */}
      <div className="dashboard__progress">
        <h3>Task Progress ✅</h3>
        <div className="progress-bar">
          <div
            className="progress-bar__fill"
            style={{ width: `${taskProgress}%` }}
          >
            {taskProgress}%
          </div>
        </div>
      </div>

      {/* Photo Gallery (optional) */}
      <div className="dashboard__gallery">
        <img src="https://i.pinimg.com/736x/0d/df/4c/0ddf4c8eaee0451f6cd9379f3a01443d.jpg" alt="Gallery 1" />
        <img src="https://i.pinimg.com/736x/02/6b/0f/026b0f3589d303fb5e6ee85627b68e4f.jpg" alt="Gallery 2" />
        <img src="https://i.pinimg.com/736x/6b/e9/29/6be929204d84a9357e89ed87fc077537.jpg" alt="Gallery 3" />
      </div>
    </div>
  );
}
