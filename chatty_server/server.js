// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on port ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({
  server
});


let allMessages = [];

function broadcastMessage(message) {
  for (let client of wss.clients) {
    client.send(message);
  }
}

function handleMessage(messageObj) {
  let messageParsed = JSON.parse(messageObj);

  if (messageParsed.type === "postNotification") {
    messageParsed.type = "incomingNotification";
  } else {
    messageParsed.type = "incomingMessage";
  }
  messageParsed.id = uuidv4();
  allMessages.push(messageParsed);
  broadcastMessage(JSON.stringify(messageParsed));
}

function disconnect(client) {
  console.log('Client disconnected');
  const currentUserCount = {
    type: "userCount",
    userCount: wss.clients.size
  };
  for (let client of wss.clients) {
    client.send(JSON.stringify(currentUserCount));
  }
}

function handleConnection(client) {
  console.log('Client connected');
  // Send current user count to all users
  const currentUserCount = {
    type: "userCount",
    userCount: wss.clients.size
  };
  for (let client of wss.clients) {
    client.send(JSON.stringify(currentUserCount));
  }
  // Populate with old messages (if there are any)
  if (allMessages.length > 0) {
    client.send(JSON.stringify(allMessages));
  }

  // Check for messages
  client.on('message', handleMessage);
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('close', disconnect);
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', handleConnection);