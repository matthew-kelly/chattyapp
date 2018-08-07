import React, { Component } from 'react';
import MessageList from './MessageList.jsx';

class Message extends Component {
  render() {
    const generatedMessages = MessageList.map((message) => {
      if (message.type === "incomingNotification") {
        <div className="message system">
          {message.content}
        </div>
      } else if (message.type === "incomingMessage") {
        <div className="message">
          <span className="message-username">{message.username}</span>
          <span className="message-content">{message.content}</span>
        </div>
      }
    });
    return (
      <main className="messages">
        {generatedMessages}
        <div className="message">
          <span className="message-username">Test</span>
          <span className="message-content">Test</span>
        </div>
      </main>
    )
  }
}

export default Message;