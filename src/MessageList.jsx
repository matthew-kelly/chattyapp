import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        <Message />
      </main>
    );
  }
}

export default MessageList;

// class Message extends Component {
//   render() {
//     const generatedMessages = MessageList.map((message) => {
//       if (message.type === "incomingNotification") {
//         <div className="message system">
//           {message.content}
//         </div>
//       } else if (message.type === "incomingMessage") {
//         <div className="message">
//           <span className="message-username">{message.username}</span>
//           <span className="message-content">{message.content}</span>
//         </div>
//       }
//     });
//     return (
//       <main className="messages">
//         {generatedMessages}
//         <div className="message">
//           <span className="message-username">Test</span>
//           <span className="message-content">Test</span>
//         </div>
//       </main>
//     )
//   }
// }


// const MessageList = [{
//   type: "incomingMessage",
//   content: "I won't be impressed with technology until I can download food.",
//   username: "Anonymous1"
// },
// {
//   type: "incomingNotification",
//   content: "Anonymous1 changed their name to nomnom",
// },
// {
//   type: "incomingMessage",
//   content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
//   username: "Anonymous2"
// },
// {
//   type: "incomingMessage",
//   content: "...",
//   username: "nomnom"
// },
// {
//   type: "incomingMessage",
//   content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
//   username: "Anonymous2"
// },
// {
//   type: "incomingMessage",
//   content: "This isn't funny. You're not funny",
//   username: "nomnom"
// },
// {
//   type: "incomingNotification",
//   content: "Anonymous2 changed their name to NotFunny",
// },
// ];

// export default MessageList;