import React, { Component } from 'react';

class Message extends Component {
  render() {
    const message = this.props.message;

    if (message.type === "incomingNotification") {
      return (
        <div className="message system">
          <span className="notification-content">{message.content}</span>
        </div>
      );
    } else if (message.type === "incomingImage") {
      return (
        <div className="message">
          <span className="message-username" style={{color: message.color}}>{message.username}</span>
          <div className="message-content">
            <img src={message.content} className="message-image" />
          </div>
        </div>
      )
    } else {
      return (
        <div className="message">
          <span className="message-username" style={{color: message.color}}>{message.username}</span>
          <span className="message-content">{message.content}</span>
        </div>
      );
    }
  };
}

export default Message;