import React, { useState } from "react";
import "./Chatbot.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the default styles for DatePicker
import axios from "axios"; // Import axios for HTTP requests

const Chatbot = () => {
  const [chatInput, setChatInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // Store the selected date

  const handleButtonClick = (presetText) => {
    setChatInput(presetText);
    addChatMessage("user", presetText);
  };

  const handleInputChange = (e) => {
    setChatInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (chatInput.trim() === "") return;

    // Add the user's message to the chat log
    addChatMessage("user", chatInput);

    try {
      // Send the user's message to the backend
      const response = await axios.post("http://localhost:5000/chat", {
        message: chatInput,
      });

      // Get the response message from the backend and display it in the chat log
      const botMessage = response.data.message;
      addChatMessage("bot", botMessage);
    } catch (error) {
      console.error("Error sending message to backend:", error);
      addChatMessage("bot", "Sorry, something went wrong.");
    }

    // Clear the input after sending the message
    setChatInput("");
  };

  const addChatMessage = (sender, message) => {
    setChatLog((prevLog) => [...prevLog, { sender, message }]);
  };

  // Function to handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date ? date.toLocaleDateString() : "";
    addChatMessage("user", `Show me bills for ${formattedDate}`);
    handleSendMessage(); // Trigger message sending with the date format
  };

  return (
    <div className="chatbot">
      <header className="chatbot-header">
        <h1>Chat with conversoDB</h1>
      </header>

      <div className="chatbot-body">
        <div className="buttons-container">
          <div className="options-panel">
            <h3>Quick Options:</h3>
            <button onClick={() => handleButtonClick("Display Bills")}>Display Bills</button>
            <button onClick={() => handleButtonClick("Add Item")}>Add Item</button>
            <button onClick={() => handleButtonClick("Get User Details")}>Get User Details</button>
            <button onClick={() => handleButtonClick("Update Item")}>Update Item</button>
            <button onClick={() => handleButtonClick("Delete Item")}>Delete Item</button>
            <button onClick={() => handleButtonClick("Search Item")}>Search Item</button>
            <button onClick={() => handleButtonClick("Help")}>Help</button>
          </div>

          {/* Calendar Section */}
          <div className="calendar-section">
            <h3>Select a Date:</h3>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select a day"
              className="calendar-input"
            />
          </div>
        </div>

        <div className="chat-display-container">
          <div className="chat-display">
            {chatLog.map((chat, index) => (
              <div
                key={index}
                className={`chat-message ${chat.sender === "user" ? "user" : "bot"}`}
              >
                {chat.message}
              </div>
            ))}
          </div>

          <div className="chat-input-area">
            <input
              type="text"
              value={chatInput}
              onChange={handleInputChange}
              placeholder="Type your message here..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
