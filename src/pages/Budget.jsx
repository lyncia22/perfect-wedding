import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import supabase from "../supabaseClient";
import "./Budget.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Budget() {
  const [user, setUser] = useState(null);
  const [weddingDetails, setWeddingDetails] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ name: "", amount: "" });

  // Fetch user and wedding details on mount
  useEffect(() => {
    const fetchUserAndWedding = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("User fetch error:", userError);
        return;
      }
      setUser(user);

      // Fetch wedding details from Supabase DB
      const {
        data: weddingData,
        error: weddingError,
      } = await supabase
        .from("wedding_details")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (weddingError) {
        console.error("Wedding details fetch error:", weddingError);
      } else {
        setWeddingDetails(weddingData);
      }
    };

    fetchUserAndWedding();
  }, []);

  // Fetch expenses once user is loaded
  useEffect(() => {
    if (!user) return;

    const fetchExpenses = async () => {
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching expenses:", error);
      } else {
        setExpenses(data);
      }
    };

    fetchExpenses();
  }, [user]);

  const totalBudget = Number(weddingDetails?.budget || 0);
  const totalSpent = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  const remainingBudget = Math.max(totalBudget - totalSpent, 0);

  const chartData = {
    labels: ["Spent", "Remaining"],
    datasets: [
      {
        data: [totalSpent, remainingBudget],
        backgroundColor: ["#6A5ACD", "#E0E0E0"],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!newExpense.name.trim() || !newExpense.amount) return;
    if (!user) return console.error("User not logged in");

    const amountNum = Number(newExpense.amount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    const { data, error } = await supabase
      .from("expenses")
      .insert([
        {
          user_id: user.id,
          name: newExpense.name.trim(),
          amount: amountNum,
        },
      ])
      .select();

    if (error) {
      console.error("Error adding expense:", error.message);
    } else if (data) {
      setExpenses([data[0], ...expenses]);
      setNewExpense({ name: "", amount: "" });
    }
  };

  const handleDeleteExpense = async (id) => {
    const { error } = await supabase.from("expenses").delete().eq("id", id);
    if (error) {
      console.error("Error deleting expense:", error.message);
    } else {
      setExpenses(expenses.filter((exp) => exp.id !== id));
    }
  };

  return (
    <div className="budget">
      <h1>Budget Tracker 💰</h1>

      <div className="budget-summary">
        <div className="summary-box">
          <h3>Total Budget</h3>
          <p>${totalBudget.toFixed(2)}</p>
        </div>
        <div className="summary-box">
          <h3>Spent</h3>
          <p>${totalSpent.toFixed(2)}</p>
        </div>
        <div className={`summary-box ${remainingBudget < 0 ? "over" : ""}`}>
          <h3>Remaining</h3>
          <p>${remainingBudget.toFixed(2)}</p>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: totalBudget > 0 ? `${(totalSpent / totalBudget) * 100}%` : "0%",
            }}
          ></div>
        </div>
      </div>

      <form className="budget-form" onSubmit={handleAddExpense}>
        <input
          type="text"
          placeholder="Expense name"
          value={newExpense.name}
          onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          min="0"
          step="0.01"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
        />
        <button type="submit">Add</button>
      </form>

      <div className="expense-list">
        {expenses.length === 0 ? (
          <p>No expenses yet</p>
        ) : (
          expenses.map((expense) => (
            <div key={expense.id} className="expense-item">
              <span>{expense.name}</span>
              <span>${Number(expense.amount).toFixed(2)}</span>
              <button onClick={() => handleDeleteExpense(expense.id)}>❌</button>
            </div>
          ))
        )}
      </div>

      <div className="budget-chart">
        <h2>Budget Breakdown</h2>
        <div style={{ maxWidth: 400, margin: "auto" }}>
          <Pie
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "bottom" },
                tooltip: { enabled: true },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
