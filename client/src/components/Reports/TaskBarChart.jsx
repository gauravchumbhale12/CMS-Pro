import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

import { useTask } from "../../context/TaskContext";

function TaskBarChart() {
  const { tasks } = useTask();

  const pending = tasks.filter(
    (t) => t.status === "Pending"
  ).length;

  const running = tasks.filter(
    (t) => t.status === "Running" || t.status === "In Progress"
  ).length;

  const completed = tasks.filter(
    (t) => t.status === "Completed"
  ).length;

  const data = [
    { name: "Pending", value: pending },
    { name: "Running", value: running },
    { name: "Completed", value: completed },
  ];

  const colors = ["#facc15", "#3b82f6", "#22c55e"];

  return (
    <div className="chart-box">
      <h2 style={{ color: "white", marginBottom: "20px" }}>
        📈 Task Progress
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TaskBarChart;