import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "./Analytics.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Analytics() {
  const data = {
    labels: ["Weddings", "Vendors", "Messages"],
    datasets: [
      {
        label: "2025 Stats",
        data: [85, 40, 1230],
        backgroundColor: ["#5a2a83", "#ffdd57", "#7e57c2"],
        borderRadius: 10,
        barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#333",
        },
      },
      title: {
        display: true,
        text: "Platform Activity Overview",
        color: "#333",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#666" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#666" },
        grid: { color: "#eee" },
      },
    },
  };

  return (
    <div className="analytics">
      <h1>Analytics Dashboard 📊</h1>
      <p>Track your platform's performance and trends.</p>

      <div className="analytics-cards">
        <div className="analytics-card">
          <h2>Active Weddings</h2>
          <p>85</p>
        </div>
        <div className="analytics-card">
          <h2>Active Vendors</h2>
          <p>40</p>
        </div>
        <div className="analytics-card">
          <h2>Messages Sent</h2>
          <p>1,230</p>
        </div>
      </div>

      <div className="analytics-chart">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
