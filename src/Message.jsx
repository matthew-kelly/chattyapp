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
    } else {
      return (
        <div className="message">
          <span className="message-username" style={{color: message.userColor}}>{message.username}</span>
          <span className="message-content">{message.content}</span>
        </div>
      );
    }
  };
}

export default Message;