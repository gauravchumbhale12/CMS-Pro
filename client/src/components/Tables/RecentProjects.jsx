import "./RecentProjects.css";

function RecentProjects() {
  const projects = [
    {
      id: 1,
      name: "Company Website",
      client: "ABC Pvt Ltd",
      status: "Running",
      deadline: "30 Aug 2026",
    },
    {
      id: 2,
      name: "ERP Software",
      client: "XYZ Industries",
      status: "Completed",
      deadline: "12 Jul 2026",
    },
    {
      id: 3,
      name: "CRM System",
      client: "Tech Solutions",
      status: "Pending",
      deadline: "15 Sep 2026",
    },
    {
      id: 4,
      name: "Inventory App",
      client: "MNO Company",
      status: "Running",
      deadline: "25 Aug 2026",
    },
  ];

  return (
    <div className="recent-projects">

      <h2>Recent Projects</h2>

      <table>

        <thead>

          <tr>
            <th>ID</th>
            <th>Project</th>
            <th>Client</th>
            <th>Status</th>
            <th>Deadline</th>
          </tr>

        </thead>

        <tbody>

          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>{project.name}</td>
              <td>{project.client}</td>
              <td>
                <span className={project.status.toLowerCase()}>
                  {project.status}
                </span>
              </td>
              <td>{project.deadline}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default RecentProjects;