import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import { IncomingMessage } from 'http';

class App extends Component {

  constructor(props) {
    super(props);
    this.socket = new WebSocket(`ws://localhost:3001`);
    this.state = {
      currentUser: { name: "Bob" },
      messages: [] // messages coming from the server will be stored here as they arrive
    };
  }

  // Client connects to server
  onConnectionToServer = (event) => {
    console.log("Connected to server");
    const messages = this.state.messages;
    this.setState({ messages }); // update messages state with running message list from server
  }

  // Message is received from server
  IncomingMessage = (incomingMessage) => {
    const newMessage = JSON.parse(incomingMessage.data);
    const messages = this.state.messages.concat(newMessage);
    this.setState({ messages });
  }

  // ChatBar.jsx is submitted with new username/message
  addMessage = (event) => {
    event.preventDefault();
    const username = event.target.elements.chatbarUsername.value;
    let content = event.target.elements.chatbarMessage.value;

    if (content.trim().length < 1) {
      return;
    }

    const newMessage = {
      username,
      content
    };
    // set currentUser to be inputted username
    this.setState({currentUser: username});

    this.socket.send(JSON.stringify(newMessage)); // send message to server
    event.target.elements.chatbarMessage.value = ""; // clear message field
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket.addEventListener('open', this.onConnectionToServer); // connect to server

    this.socket.addEventListener('message', this.IncomingMessage); // listen for incoming messages
  }

  // render page content
  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar onSubmit={this.addMessage} currentUser={this.state.currentUser} />
      </div>
    );
  }
}
export default App;
