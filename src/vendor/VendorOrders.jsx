import "./VendorOrders.css";
import { useState } from "react";

export default function VendorOrders() {
  const [orders] = useState([
    { id: 1, customer: "Lynn & John", service: "Photography", status: "Pending" },
    { id: 2, customer: "Emma & Noah", service: "Catering", status: "Confirmed" },
    { id: 3, customer: "Sophia & Liam", service: "Decor", status: "Completed" },
  ]);

  return (
    <div className="vendor-orders">
      <h1>Orders 📦</h1>
      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Service</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.service}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
