import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import { IncomingMessage } from 'http';

const ws = new WebSocket(`ws://localhost:3001`);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Bob" },
      messages: [] // messages coming from the server will be stored here as they arrive
    };
  }

  onConnectionToServer = (event) => {
    console.log("Connected to server");
    const messages = this.state.messages;
    this.setState({ messages });
  }

  IncomingMessage = (incomingMessage) => {
    const newMessage = JSON.parse(incomingMessage.data);
    const messages = this.state.messages.concat(newMessage);
    this.setState({ messages });
  }

  // // addMessage Original Code
  // addMessage = (event) => {
  //   event.preventDefault();
  //   const username = event.target.elements.chatbarUsername.value;
  //   let content = event.target.elements.chatbarMessage.value;

  //   if (content.trim().length < 1) {
  //     return;
  //   }

  //   const id = this.generateRandomId();

  //   const newMessage = {
  //     username,
  //     content,
  //     id
  //   };

  //   const messages = this.state.messages.concat(newMessage);
  //   this.setState({ messages });
  //   event.target.elements.chatbarMessage.value = "";
  // }

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

    ws.send(JSON.stringify(newMessage));
    event.target.elements.chatbarMessage.value = "";
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    ws.addEventListener('open', this.onConnectionToServer);

    ws.addEventListener('message', this.IncomingMessage);
  }

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
