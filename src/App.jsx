import React, { Component } from 'react';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import { IncomingMessage } from 'http';

class App extends Component {

  constructor(props) {
    super(props);
    // this.socket = new WebSocket(`ws://localhost:3001`);
    this.socket = new WebSocket(`ws://${window.location.host}`);
    this.state = {
      currentUser: { name: "Anonymous" },
      messages: [], // messages coming from the server will be stored here as they arrive
      userCount: 0
    };
  }

  // Client connects to server
  onConnectionToServer = (event) => {
    console.log("Connected to server");
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  // Message is received from server
  IncomingMessage = (incomingMessage) => {
    const newMessage = JSON.parse(incomingMessage.data);
    if (newMessage.type === "userCount") { // userCount
      const userCount = newMessage.userCount;
      this.setState({ userCount });
    } else if (newMessage.type === "incomingNotification") { // Notifications
      if (newMessage.color) {
        this.setState({ currentUser: { color: newMessage.color, name: this.state.currentUser.name } });
      }
      const messages = this.state.messages.concat(newMessage);
      this.setState({ messages });
    } else { // Messages
      const messages = this.state.messages.concat(newMessage);
      this.setState({ messages });
    }
  }

  // Change currentUser.name to be entered username
  changeUsername = (event) => {
    event.preventDefault();
    const username = event.target.elements.chatbarUsername.value;

    const newUsername = {
      username,
      type: "postNotification",
      content: `${username} has joined the room.`
    };
    // content: `${this.state.currentUser.name} has changed their name to ${username}`

    if (!username) {
      this.setState({ currentUser: { name: "Anonymous" } });
    } else {
      this.setState({ currentUser: { name: username } });
    }

    this.socket.send(JSON.stringify(newUsername)); // send username to server
  }

  // Image url validation
  checkURL = (url) => {
    return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }

  // ChatBar.jsx is submitted with new username/message
  addMessage = (event) => {
    event.preventDefault();
    const username = this.state.currentUser.name;
    let content = event.target.elements.chatbarMessage.value;
    let newMessage = {
      username,
      content
    };
    if (this.checkURL(content)) {
      newMessage.type = "postImage";
    } else {
      if (content.trim().length < 1) {
        return false;
      }
      newMessage.type = "postMessage";
    }

    this.setState({ currentUser: { name: username } }); // set currentUser to be inputted username

    this.socket.send(JSON.stringify(newMessage)); // send message to server
    event.target.elements.chatbarMessage.value = ""; // clear message field
  }

  componentDidMount() {
    this.scrollToBottom();
    console.log("componentDidMount <App />");

    this.socket.addEventListener('open', this.onConnectionToServer); // connect to server

    this.socket.addEventListener('message', this.IncomingMessage); // listen for incoming messages
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  // render page content
  render() {
    return (
      <div className="absolute-container">
        <NavBar userCount={this.state.userCount} />
        <MessageList messages={this.state.messages} />
        <div ref={(el) => { this.messagesEnd = el; }}></div>
        <ChatBar changeUsername={this.changeUsername} addMessage={this.addMessage} currentUser={this.state.currentUser} />
      </div>
    );
  }
}
export default App;
