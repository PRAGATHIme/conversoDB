import React, { useState } from "react";
import "./Chatbot.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the default styles for DatePicker
import axios from "axios"; // Import axios for HTTP requests
import Navbar from "./Navbar";

// For voice-to-text
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const Chatbot = () => {
  const [chatLog, setChatLog] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // Store the selected date
  const [isListening, setIsListening] = useState(false); // For voice input state

  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  // Handle voice input
  const handleStartVoiceInput = () => {
    if (!recognition) {
      addChatMessage("bot", "Voice recognition is not supported on this browser.");
      return;
    }

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      addChatMessage("user", transcript); // Add directly to chat log
      sendMessageToBackend(transcript); // Send message to backend
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      console.error("Voice recognition error:", event.error);
      addChatMessage("bot", "Sorry, I couldn't understand. Please try again.");
    };
  };

  const handleButtonClick = (presetText) => {
    addChatMessage("user", presetText); // Add directly to chat log
    sendMessageToBackend(presetText); // Send message to backend
  };

  const handleSendMessage = async (message) => {
    if (message.trim() === "") return;
    addChatMessage("user", message); // Add user message to the chat log
    sendMessageToBackend(message); // Send message to backend
  };

  const sendMessageToBackend = async (message) => {
    try {
      const response = await axios.post("http://localhost:5000/chat", {
        message,
      });

      const botMessage = response.data.message;
      addChatMessage("bot", botMessage); // Add bot response to the chat log
    } catch (error) {
      console.error("Error sending message to backend:", error);
      addChatMessage("bot", "Sorry, something went wrong.");
    }
  };

  const addChatMessage = (sender, message) => {
    setChatLog((prevLog) => [...prevLog, { sender, message }]);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date ? date.toLocaleDateString() : "";
    const message = `Show me bills for ${formattedDate}`;
    addChatMessage("user", message);
    sendMessageToBackend(message); // Send formatted date as message
  };

  return (
    <div className="chatbot">
      <Navbar />
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
              placeholder="Type your message here..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage(e.target.value);
                  e.target.value = ""; // Clear input after sending
                }
              }}
            />
            <button onClick={() => handleSendMessage(document.querySelector('.chat-input-area input').value)}>Send</button>
            <button
              onClick={handleStartVoiceInput}
              disabled={isListening}
              className="voice-input-button"
            >
              <i className={`fa-solid fa-microphone ${isListening ? "listening" : ""}`}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
