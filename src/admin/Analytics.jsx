import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import supabase from "../supabaseClient";
import "./Analytics.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Analytics() {
  const [stats, setStats] = useState({ weddings: 0, vendors: 0, messages: 0 });

  useEffect(() => {
    async function fetchStats() {
      const { data, error } = await supabase
        .from("dashboard_stats")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Error fetching stats:", error);
      } else if (data) {
        setStats({
          weddings: data.weddings,
          vendors: data.vendors,
          messages: data.messages,
        });
      }
    }

    fetchStats();

    // Optionally auto-refresh every 30 seconds:
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: ["Weddings", "Vendors", "Messages"],
    datasets: [
      {
        label: "Live Stats",
        data: [stats.weddings, stats.vendors, stats.messages],
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
          <p>{stats.weddings}</p>
        </div>
        <div className="analytics-card">
          <h2>Active Vendors</h2>
          <p>{stats.vendors}</p>
        </div>
        <div className="analytics-card">
          <h2>Messages Sent</h2>
          <p>{stats.messages}</p>
        </div>
      </div>

      <div className="analytics-chart">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
