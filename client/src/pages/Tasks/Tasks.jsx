import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import TaskTable from "../../components/Tables/TaskTable";

function Tasks() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
        style={{
          marginLeft: "260px",
          width: "100%",
          background: "#0f172a",
          minHeight: "100vh",
          padding: "30px",
        }}
      >
        <Navbar />

        <h1
          style={{
            color: "white",
            marginTop: "30px",
            marginBottom: "25px",
          }}
        >
          ✅ Today's Tasks
        </h1>

        <TaskTable />
      </div>
    </div>
  );
}

export default Tasks;