export default function TaskCard({ task, onUpdate, onDelete }) {
  const getStatusColor = () => {
    if (task.status === "Todo") return "#f59e0b";
    if (task.status === "In Progress") return "#3b82f6";
    if (task.status === "Completed") return "#10b981";
    return "#6b7280";
  };

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        marginBottom: "20px",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        border: "1px solid #e5e7eb",
        transition: "0.3s",
      }}
    >
      <h2
        style={{
          marginBottom: "10px",
          color: "#111827",
        }}
      >
        {task.title}
      </h2>

      <p
        style={{
          color: "#6b7280",
          marginBottom: "15px",
        }}
      >
        {task.description}
      </p>

      <span
        style={{
          background: getStatusColor(),
          color: "white",
          padding: "6px 12px",
          borderRadius: "999px",
          fontSize: "14px",
          fontWeight: "bold",
        }}
      >
        {task.status}
      </span>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <button
          onClick={() => onUpdate(task._id, "Todo")}
          style={{
            background: "#f59e0b",
            color: "white",
            border: "none",
            padding: "10px 14px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Todo
        </button>

        <button
          onClick={() => onUpdate(task._id, "In Progress")}
          style={{
            background: "#3b82f6",
            color: "white",
            border: "none",
            padding: "10px 14px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          In Progress
        </button>

        <button
          onClick={() => onUpdate(task._id, "Completed")}
          style={{
            background: "#10b981",
            color: "white",
            border: "none",
            padding: "10px 14px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Completed
        </button>

        <button
          onClick={() => onDelete(task._id)}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "10px 14px",
            borderRadius: "8px",
            cursor: "pointer",
            marginLeft: "auto",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}