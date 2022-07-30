# Chat With Me

> A chatting web app built with React and Socket.io

## Development
- client folder contains frontend related artifacts
  - ```yarn serve``` runs the application
  - ```yarn build``` builds the static resources
  - ```yarn deploy``` deploys the static resources to your Github page
- server folder contains backend related files
  - ```yarn start``` kicks off the server

## Deployment
- Push server
  - If you host the socket.io server with Heroku, follow the following instruction
  - Heroku Setup
      ```
      npm install -g heroku
      heroku login
      heroku git:remote -a your-app
      git subtree push --prefix server heroku master
      ```
- Push client
  - Use your preference to host your client app. I chose Github Page for its simplicity.
  - Run ```yarn build``` and then ```yarn deploy```
  - Make sure main.js connects to your server (and not localhost)

### Technologies 🔧
+ [React](https://reactjs.org/)
+ [Socket.io](https://socket.io/)

#### License ⚖️
[MIT](https://en.wikipedia.org/wiki/MIT_License)
