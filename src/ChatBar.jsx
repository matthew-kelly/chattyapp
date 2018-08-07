import React, { Component } from 'react';

class ChatBar extends Component {
  render() {
    const currentUser = this.props.currentUser ? this.props.currentUser : { name: "Anonymous" };
    return (
      <footer className="chatbar">
        <form onSubmit={this.props.onSubmit}>
          <input name="chatbarUsername" className="chatbar-username" defaultValue={currentUser.name} />
          <input name="chatbarMessage" className="chatbar-message" placeholder="Type a message and hit ENTER" />
          <input style={{ display: "none" }} type="submit" />
        </form>
      </footer>
    )
  }
}

export default ChatBar;