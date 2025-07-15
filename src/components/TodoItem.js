// src/components/TodoItem.js
import React, { useState } from 'react';

function TodoItem({ todo, toggleComplete, deleteTodo, updateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (newTitle.trim() && newTitle !== todo.title) {
      updateTodo(todo.id, { title: newTitle });
    }
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setNewTitle(todo.title);
    setIsEditing(false);
  };

  return (
    <li style={getItemStyle(todo.completed)}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={editInputStyle}
          />
          <button onClick={handleSaveClick} style={saveButtonStyle}>Save</button>
          <button onClick={handleCancelClick} style={cancelButtonStyle}>Cancel</button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id, todo.completed)}
            style={checkboxStyle}
          />
          <span style={textStyle}>{todo.title}</span>
          <button onClick={handleEditClick} style={editButtonStyle}>Edit</button>
          <button onClick={() => deleteTodo(todo.id)} style={deleteButtonStyle}>Delete</button>
        </>
      )}
    </li>
  );
}

const getItemStyle = (completed) => ({
  background: '#f4f4f4',
  padding: '10px',
  borderBottom: '1px #ccc dotted',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  textDecoration: completed ? 'line-through' : 'none',
  color: completed ? '#888' : '#333',
});

const checkboxStyle = {
  marginRight: '10px',
  transform: 'scale(1.2)',
};

const textStyle = {
  flexGrow: 1,
  marginRight: '10px',
};

const buttonBaseStyle = {
  border: 'none',
  padding: '8px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
  marginLeft: '5px',
};

const editButtonStyle = {
  ...buttonBaseStyle,
  background: '#007bff',
  color: 'white',
};

const deleteButtonStyle = {
  ...buttonBaseStyle,
  background: '#dc3545',
  color: 'white',
};

const saveButtonStyle = {
  ...buttonBaseStyle,
  background: '#28a745',
  color: 'white',
};

const cancelButtonStyle = {
  ...buttonBaseStyle,
  background: '#6c757d',
  color: 'white',
};

const editInputStyle = {
  flexGrow: 1,
  padding: '8px',
  border: '1px solid #007bff',
  borderRadius: '4px',
  marginRight: '10px',
};

export default TodoItem;