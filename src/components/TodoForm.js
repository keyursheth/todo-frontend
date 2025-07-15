// src/components/TodoForm.js
import React, { useState } from 'react';

function TodoForm({ addTodo }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo(title);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        type="text"
        placeholder="Add a new todo..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>Add Todo</button>
    </form>
  );
}

const formStyle = {
  display: 'flex',
  marginBottom: '20px',
};

const inputStyle = {
  flexGrow: 1,
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  marginRight: '10px',
};

const buttonStyle = {
  background: '#5cb85c',
  color: 'white',
  border: 'none',
  padding: '10px 15px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
};

export default TodoForm;