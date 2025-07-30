import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AnalyticsChart({ weddingsPerMonth }) {
  const data = {
    labels: Object.keys(weddingsPerMonth),
    datasets: [
      {
        label: "Weddings",
        data: Object.values(weddingsPerMonth),
        backgroundColor: "#ff69b4",
      },
    ],
  };

  return <Bar data={data} />;
}
