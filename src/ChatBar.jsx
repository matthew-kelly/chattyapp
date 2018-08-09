import React, { Component } from 'react';

class ChatBar extends Component {
  render() {
    const currentUser = this.props.currentUser ? this.props.currentUser : { name: "Anonymous" };
    return (
      <footer className="chatbar">
        <form className="username-entry" onSubmit={this.props.changeUsername}>
          <input name="chatbarUsername" className="chatbar-username" defaultValue={currentUser.name} />
        </form>
        <form className="message-entry" onSubmit={this.props.addMessage}>
          <input name="chatbarMessage" className="chatbar-message" placeholder="Type a message and hit ENTER" />
        </form>
      </footer>
    )
  }
}

export default ChatBar;