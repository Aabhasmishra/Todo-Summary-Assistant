// components/TodoList.jsx
import TodoItem from "./TodoItem";

const TodoList = ({
  todos,
  editingId,
  editText,
  setEditText,
  toggleTodo,
  startEditing,
  saveEdit,
  cancelEdit,
  deleteTodo,
}) => (
  <ul style={{ listStyle: "none", padding: 0 }}>
    {todos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        editingId={editingId}
        editText={editText}
        setEditText={setEditText}
        toggleTodo={toggleTodo}
        startEditing={startEditing}
        saveEdit={saveEdit}
        cancelEdit={cancelEdit}
        deleteTodo={deleteTodo}
      />
    ))}
  </ul>
);

export default TodoList;