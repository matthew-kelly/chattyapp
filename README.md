
# ChattyApp

ChattyApp is a multi-user messaging client built using React with a Node and Express server backend. Users are placed in a universal chatroom with other users, choose a persistent username,  and share messages and images with the group. ChattyApp was a solo project, with collaboration along the way with @comberj.


## Screenshots

!["Main interface - desktop"](https://github.com/matthew-kelly/chattyapp/blob/master/docs/chatty-desktop-main.jpeg)
!["Main interface - mobile"](https://github.com/matthew-kelly/chattyapp/blob/master/docs/chatty-mobile.jpeg)
!["Main interface - desktop"](https://github.com/matthew-kelly/chattyapp/blob/master/docs/chatty-desktop-image.jpeg)

## Getting Started

- Install all dependencies:

  `npm install`

- Run the ChattyApp client:

  `npm start`

- Run the ChattyApp web server (in a separate terminal window):

  `cd chatty_server && npm start`


## Dependencies
### ChattyApp (client)

- React
- Webpack
- babel-loader
- webpack-dev-server

### ChattyApp (server)

- "express": "4.16.3"
- "uuid": "^3.3.2"
- "ws": "6.0.0"