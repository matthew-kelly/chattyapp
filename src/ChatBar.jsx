import React, { Component } from 'react';

class ChatBar extends Component {
  render() {
    const currentUser = this.props.currentUser ? this.props.currentUser : { name: "Anonymous" };
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={currentUser.name} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    )
  }
}

export default ChatBar;