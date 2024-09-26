import React, { useEffect, useState } from 'react';
import { getMessages, postMessage } from './api';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');
  
  const fetchMessages = async () => {
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const handlePostMessage = async (e) => {
    e.preventDefault();
    if (!username || !text) {
      alert("Both username and message are required!");
      return;
    }
    try {
      await postMessage(username, text);
      setText('');
      setUsername('');
      fetchMessages();  // Refresh the messages after posting
    } catch (error) {
      console.error("Failed to post message:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="App">
      <h1>Anslagstavla</h1>
      <form onSubmit={handlePostMessage}>
        <input
          type="text"
          placeholder="Användarnamn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <textarea
          placeholder="Skriv ditt meddelande här..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button type="submit">Posta Meddelande</button>
      </form>
      <div>
        <h2>Meddelanden</h2>
        {messages.map(message => (
          <div key={message.id}>
            <strong>{message.username}</strong>: {message.text} <em>{new Date(message.createdAt).toLocaleString()}</em>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
