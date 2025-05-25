const TodoInput = ({ newTodo, setNewTodo, addTodo }) => (
  <div
    style={{
      marginBottom: "20px",
      padding: "0 0 0 21px",
      height: "3.15rem",
      background: "#edeef0",
      borderRadius: "30px",
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    <input
      value={newTodo}
      onChange={(e) => setNewTodo(e.target.value)}
      placeholder="Add a new task"
      style={{
        padding: "8px",
        marginRight: "10px",
        fontSize: "1rem",
        outline: "none",
        width: "100%",
        border: "none",
        background: "transparent",
        display: "flex",
        alignItems: "center",
      }}
    />
    <button
      onClick={addTodo}
      style={{
        fontSize: "14px",
        width: "8.03rem",
        padding: "8px 15px",
        backgroundColor: "#FF5945",
        color: "white",
        border: "none",
        borderRadius: "30px",
      }}
    >
      Add
    </button>
  </div>
);

export default TodoInput;