import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./Budget.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Budget() {
  const [weddingDetails, setWeddingDetails] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ name: "", amount: "" });

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("weddingDetails"));
    setWeddingDetails(details);
  }, []);

  const totalBudget = Number(weddingDetails?.budget || 0);
  const totalSpent = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const remaining = totalBudget - totalSpent;

  const handleAddExpense = () => {
    if (!newExpense.name || !newExpense.amount) return;
    setExpenses([...expenses, newExpense]);
    setNewExpense({ name: "", amount: "" });
  };

  const handleDeleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const chartData = {
    labels: ["Spent", "Remaining"],
    datasets: [
      {
        data: [totalSpent, remaining > 0 ? remaining : 0],
        backgroundColor: ["#6A5ACD", "#D8D8D8"], // Purple + Gray
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="budget">
      <h1>Budget Tracker 💰</h1>

      <div className="budget-summary">
        <p><strong>Total Budget:</strong> ${totalBudget}</p>
        <p><strong>Spent:</strong> ${totalSpent}</p>
        <p><strong>Remaining:</strong> ${remaining >= 0 ? remaining : 0}</p>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0}%`,
            }}
          ></div>
        </div>
      </div>

      <div className="budget-form">
        <input
          type="text"
          placeholder="Expense name"
          value={newExpense.name}
          onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
        />
        <button onClick={handleAddExpense}>Add</button>
      </div>

      <div className="expense-list">
        <ul>
          {expenses.map((exp, i) => (
            <li key={i}>
              <span>{exp.name} - ${exp.amount}</span>
              <button onClick={() => handleDeleteExpense(i)}>❌</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="budget-chart">
        <h2>Budget Breakdown</h2>
        <div className="chart-wrapper">
          <Pie
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
