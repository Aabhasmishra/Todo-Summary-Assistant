import React from "react";

function TodoEdit({ editText, setEditText, saveEdit, cancelEdit }) {
  return (
    <div style={{ margin: "0.7rem 0", display: "flex", gap: "10px" }}>
      <input
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        placeholder="Edit todo..."
        style={{
          background: "#EDEEF0",
          flex: 1,
          fontSize: "0.9rem",
          padding: "0.6rem",
          borderRadius: "5px",
          border: "1px solid #ccc",
          outline: "none"
        }}
      />
      <button onClick={saveEdit} style={{ backgroundColor: "#4CAF50", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: "5px" }}>
        Save
      </button>
      <button onClick={cancelEdit} style={{ backgroundColor: "#f44336", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: "5px" }}>
        Cancel
      </button>
    </div>
  );
}

export default TodoEdit;
