import "./RecentActivity.css";
import { useProject } from "../../context/ProjectContext";
import { useTask } from "../../context/TaskContext";

function RecentActivity() {
  const { projects } = useProject();
  const { tasks } = useTask();

  const activities = [];

  projects.slice(-5).forEach((project) => {
    activities.push({
      type: "project",
      text: `Project "${project.name}" added`,
      date: project.start,
    });
  });

  tasks.slice(-5).forEach((task) => {
    activities.push({
      type: "task",
      text: `Task "${task.name}" (${task.status})`,
      date: task.date,
    });
  });

  activities.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="activityBox">
      <h2>📋 Recent Activity</h2>

      {activities.length === 0 ? (
        <p className="empty">No Activity Found</p>
      ) : (
        activities.slice(0, 8).map((item, index) => (
          <div className="activityItem" key={index}>
            <span className={item.type}>
              {item.type === "project" ? "📁" : "📝"}
            </span>

            <div>
              <h4>{item.text}</h4>
              <p>{item.date}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default RecentActivity;