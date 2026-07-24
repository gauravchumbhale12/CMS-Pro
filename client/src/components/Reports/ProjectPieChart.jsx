import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useProject } from "../../context/ProjectContext";

function ProjectPieChart() {
  const { projects } = useProject();

  const completed = projects.filter(
    (p) => p.status === "Completed"
  ).length;

  const pending = projects.filter(
    (p) => p.status === "Pending"
  ).length;

  const running = projects.filter(
    (p) => p.status === "Running" || p.status === "In Progress"
  ).length;

  const data = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
    { name: "Running", value: running },
  ];

  const COLORS = ["#3b82f6", "#facc15", "#22c55e"];

  return (
    <div className="chart-box">
      <h2 style={{ color: "white", marginBottom: "20px" }}>
        📊 Project Status
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={110}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProjectPieChart;