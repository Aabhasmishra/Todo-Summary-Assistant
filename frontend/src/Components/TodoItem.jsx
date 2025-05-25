import { FaTrashCan } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa";
import { IoIosCheckmark } from "react-icons/io";
import { CiEdit } from "react-icons/ci";

const TodoItem = ({
  todo,
  editingId,
  editText,
  setEditText,
  toggleTodo,
  startEditing,
  saveEdit,
  cancelEdit,
  deleteTodo,
}) => (
  <li
    style={{
      padding: "10px",
      margin: "5px 0",
      backgroundColor: "#fff",
      borderRadius: "4px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    {editingId === todo.id ? (
      <>
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          style={{
            flex: 1,
            margin: "0 10px",
            padding: "6px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <div style={{ display: "flex", gap: "5px" }}>
          <button
            onClick={saveEdit}
            style={{
              padding: "5px 10px",
              fontSize: "0.9rem",
              backgroundColor: "#fff",
              color: "#454545",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Save
          </button>
          <button
            onClick={cancelEdit}
            style={{
              padding: "5px 10px",
              fontSize: "0.9rem",
              backgroundColor: "#fff",
              color: "#454545",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Cancel
          </button>
        </div>
      </>
    ) : (
      <>
        <button
          onClick={() => toggleTodo(todo.id, todo.completed)}
          style={{
            margin: "0",
            padding: "0",
            height: "100%",
            display: "flex",
            alignItems: "center",
            fontSize: "1.5rem",
            backgroundColor: todo.completed ? "#FF5945" : "#fff",
            color: todo.completed ? "#fff" : "#ccc",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        >
          {todo.completed ? <IoIosCheckmark /> : <FaRegCircle />}
        </button>

        <span
          style={{
            flex: 1,
            margin: "0 0 0 10px",
            padding: "0 0 1.5px 0",
            color: todo.completed ? "#606060" : "black",
            textDecoration: todo.completed ? "line-through" : "none",
          }}
        >
          {todo.task}
        </span>

        <div style={{ display: "flex", gap: "5px" }}>
          <button
            onClick={() => startEditing(todo.id, todo.task)}
            style={{
              padding: "1px 0 0 0",
              fontSize: "1.1rem",
              backgroundColor: "#fff",
              color: "#000000",
              border: "none",
              borderRadius: "4px",
            }}
          >
            <CiEdit />
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            style={{
              padding: "5px 10px",
              fontSize: "0.9rem",
              backgroundColor: "#fff",
              color: "#454545",
              border: "none",
              borderRadius: "4px",
            }}
          >
            <FaTrashCan />
          </button>
        </div>
      </>
    )}
  </li>
);

export default TodoItem;