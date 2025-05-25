import { useState, useEffect } from "react";
import axios from "axios";
import TodoInput from "./Components/TodoInput";
import TodoList from "./Components/TodoList";
import TodoEdit from "./Components/TodoEdit";
import SummaryModal from "./Components/SummaryModal";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState(null);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [slackMessage, setSlackMessage] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/todos");
      setTodos(res.data);
    } catch (err) {
      console.error("Failed to fetch todos:", err);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      await axios.post("http://localhost:5000/todos", {
        task: newTodo,
        completed: false,
      });
      setNewTodo("");
      fetchTodos();
    } catch (err) {
      console.error("Failed to add todo:", err);
    }
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = async () => {
    if (!editText.trim()) return;
    try {
      await axios.put(`http://localhost:5000/todos/${editingId}`, {
        task: editText,
      });
      setEditingId(null);
      setEditText('');
      fetchTodos();
    } catch (err) {
      console.error("Failed to edit todo:", err);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const toggleTodo = async (id, currentStatus) => {
    try {
      const response = await axios.put(`http://localhost:5000/todos/${id}/toggle`);
      if (response.data.success) {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !currentStatus } : todo
          )
        );
      }
    } catch (err) {
      console.error("Toggle failed:", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      fetchTodos();
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };

  const handleSummarize = async () => {
    try {
      const response = await axios.post("http://localhost:5000/summarize");
      setSummary(response.data.summary);
      setShowSummaryModal(true);
    } catch (err) {
      setMessage("Failed to generate summary");
    }
  };

  const sendToSlack = async () => {
    try {
      await axios.post("http://localhost:5000/send-to-slack", { summary });
      setSlackMessage("✅ Sent to Slack successfully!");
      setTimeout(() => {
        setShowSummaryModal(false);
        setSlackMessage("");
      }, 2000);
    } catch (err) {
      setSlackMessage("❌ Failed to send to Slack");
    }
  };

  return (
    <div
      style={{
        background: "white",
        padding: "1.25rem",
        paddingTop: "1px",
        width: windowWidth < 700 ? "80vw" : "35rem",
        borderRadius: "0.625rem",
        margin: "0 auto",
        position: "relative",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#002765", fontSize: '2.1rem' }}>
        Todo Summary Assistant
      </h1>

      <TodoInput newTodo={newTodo} setNewTodo={setNewTodo} addTodo={addTodo} />

      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        startEditing={startEditing}
      />

      {editingId !== null && (
        <TodoEdit
          editText={editText}
          setEditText={setEditText}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
        />
      )}

      <button
        onClick={handleSummarize}
        style={{
          padding: "10px 20px",
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          borderRadius: "4px",
          fontSize: "16px",
        }}
      >
        Summarize Todos
      </button>

      {message && (
        <p
          style={{
            marginTop: "10px",
            color: message.includes("Failed") ? "#f44336" : "#4CAF50",
          }}
        >
          {message}
        </p>
      )}

      {showSummaryModal && (
        <SummaryModal
          summary={summary}
          sendToSlack={sendToSlack}
          slackMessage={slackMessage}
          closeModal={() => {
            setShowSummaryModal(false);
            setSlackMessage("");
          }}
        />
      )}
    </div>
  );
}

export default App;