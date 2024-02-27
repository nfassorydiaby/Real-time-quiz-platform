import React, { useState, useEffect } from 'react';

function ChatRoom({ username}) {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  function generateUserId() {
    const timestamp = new Date().getTime(); // Obtient le timestamp actuel
    const randomPart = Math.floor(Math.random() * 1000); // Génère un nombre aléatoire entre 0 et 999
    return `${timestamp}${randomPart}`; // Combine les deux pour former un ID
  }
  
  useEffect(() => {
    const newWs = new WebSocket(`ws://localhost:8000/ws/${username}`);
    setWs(newWs);

    newWs.onmessage = (event) => {
      const message = event.data;
          console.log(event.data);

      setMessages((prevMessages) => [...prevMessages, message]);
      console.log(messages)
    };

    return () => {
      newWs.close();
    };
  }, [username]);

  const sendMessage = () => {
    if (ws) {
        console.log(inputMessage);
      ws.send(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div className="p-4 bg-gray-100 border rounded shadow-lg max-w-md w-full">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Chat Room</h2>
        <div className="overflow-y-scroll h-64">
          {messages.map((msg, index) => (
            <div key={index} className="bg-white p-2 my-2 rounded shadow">
              {msg}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatRoom;
