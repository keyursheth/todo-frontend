// src/App.js
import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const API_BASE_URL = 'http://localhost:8000'; // Your FastAPI backend URL

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/todos/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setError("Failed to fetch todos. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title) => {
    const newTodo = { title, userId: "placeholder_user_id" }; // Using placeholder userId
    try {
      const response = await fetch(`${API_BASE_URL}/todos/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const addedTodo = await response.json();
      setTodos([...todos, addedTodo]);
    } catch (error) {
      console.error("Error adding todo:", error);
      setError("Failed to add todo.");
    }
  };

  const toggleComplete = async (id, currentCompletedStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !currentCompletedStatus }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedTodo = await response.json();
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error("Error toggling complete status:", error);
      setError("Failed to update todo status.");
    }
  };

  const updateTodo = async (id, updatedFields) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedTodo = await response.json();
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
      setError("Failed to update todo.");
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
      });
      if (response.status === 204) { // 204 No Content for successful deletion
        setTodos(todos.filter((todo) => todo.id !== id));
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      setError("Failed to delete todo.");
    }
  };

  return (
    <div style={appStyle}>
      <h1 style={headingStyle}>My Todo List</h1>
      <TodoForm addTodo={addTodo} />
      {loading && <p>Loading todos...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!loading && !error && todos.length === 0 && <p>No todos yet! Add one above.</p>}
      {!loading && !error && todos.length > 0 && (
        <TodoList
          todos={todos}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      )}
    </div>
  );
}

const appStyle = {
  fontFamily: 'Arial, sans-serif',
  maxWidth: '600px',
  margin: '40px auto',
  padding: '20px',
  border: '1px solid #eee',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  backgroundColor: '#fff',
};

const headingStyle = {
  textAlign: 'center',
  color: '#333',
  marginBottom: '30px',
};

export default App;