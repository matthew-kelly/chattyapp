import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Bob" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 98,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 99,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
  }

  generateRandomId = () => {
    return Math.random().toString(36).substr(2, 6);
  };

  onSubmit = (event) => {
    event.preventDefault();
    const username = event.target.elements.chatbarUsername.value;
    let content = event.target.elements.chatbarMessage.value;

    if (content.trim().length < 1) {
      return;
    }

    const id = this.generateRandomId();

    const newMessage = {
      username,
      content,
      id
    };

    const messages = this.state.messages.concat(newMessage);
    this.setState({ messages });
    event.target.elements.chatbarMessage.value = "";
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = { id: 3, username: "Michelle", content: "Hello there!" };
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages })
    }, 3000);
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar onSubmit={this.onSubmit} currentUser={this.state.currentUser} />
      </div>
    );
  }
}
export default App;
