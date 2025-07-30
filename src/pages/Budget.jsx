import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import supabase from "../supabaseClient";
import "./Budget.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Budget() {
  const [weddingDetails, setWeddingDetails] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ name: "", amount: "" });

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("weddingDetails"));
    setWeddingDetails(details);

    const fetchExpenses = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error) setExpenses(data);
    };

    fetchExpenses();
  }, []);

  const totalBudget = Number(weddingDetails?.budget || 0);
  const totalSpent = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const remaining = totalBudget - totalSpent;

  const handleAddExpense = async () => {
    if (!newExpense.name || !newExpense.amount) return;

    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase.from("expenses").insert([
      {
        user_id: user.id,
        name: newExpense.name,
        amount: newExpense.amount,
      },
    ]).select();

    if (!error && data) {
      setExpenses([data[0], ...expenses]);
      setNewExpense({ name: "", amount: "" });
    } else {
      console.error("Add Error:", error.message);
    }
  };

  const handleDeleteExpense = async (id) => {
    const { error } = await supabase.from("expenses").delete().eq("id", id);
    if (!error) {
      setExpenses(expenses.filter((exp) => exp.id !== id));
    }
  };

  const chartData = {
    labels: ["Spent", "Remaining"],
    datasets: [
      {
        data: [totalSpent, remaining > 0 ? remaining : 0],
        backgroundColor: ["#6A5ACD", "#D8D8D8"],
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
          {expenses.map((exp) => (
            <li key={exp.id}>
              <span>{exp.name} - ${exp.amount}</span>
              <button onClick={() => handleDeleteExpense(exp.id)}>❌</button>
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
