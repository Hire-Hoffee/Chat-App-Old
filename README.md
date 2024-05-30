# Chat App

#### Russian-language [README](https://github.com/Hire-Hoffee/Chat-App/blob/main/README_RU.md).

<br>
<div style="text-align:center">
  <img src="https://i.imgur.com/BHiaPEH.png" width="1000"/>
  <img src="https://i.imgur.com/Bkeucu0.png" width="1000"/>
</div>
<br>

## Functionality

- **Registration and Authorization:** Users can register with an email address, username and password, and then log in with saved credentials.
- **User List:** Registered users can view a list of all other users in the system.
- **Chat Room Creation:** Users can create chat rooms for private correspondence with another user.
- **Real-time messaging:** Users in a chat room can exchange real-time text messages using WebSockets.
- **Avatar Display:** Users can upload avatars to be displayed next to their messages.

<br>
<div style="text-align:center">
  <img src="https://i.imgur.com/f7kD5Du.png" width="1000"/>
</div>
<br>

### Technology

### Backend

Node.js, Express.js, MongoDB, Socket.IO, Bcrypt, JSONWebToken, Multer.

### Frontend

HTML, CSS, JavaScript, Bootstrap, EJS, Axios.

### Project Structure

- **app/client:** Contains the client side of the application (HTML, CSS, JavaScript).
  - **public:** Static files such as images, fonts.
  - **views:** EJS templates for rendering web pages.
  - **javascript:** JavaScript files for handling client-side logic.
- **app/server:** Contains the server side of the application (Node.js, Express.js).
  - **config:** Configuration files such as database connection, storage configuration.
  - **controllers:**Controllers that handle routing logic.
  - **middleware:** Middleware for Express.js used for authentication and error handling.
  - **models:** Mongoose schemas for user data and messages.
  - **routes:** Route definitions for Express.js.
  - **socketHandlers:** Socket.IO event handlers.

## How the project works

1. A user visits the site and can register or log in.
2. After authorization, the user is shown a list of chat rooms and a list of all users.
3. The user can select an existing chat room or create a new one by clicking on the username in the list.
4. When a message is sent by the client, it is sent to the server via Socket.IO.
5. The server saves the message in the database and sends it to all clients connected to the chat room.
6. The clients receive the message and display it in the chat room.

## Running the application

- To run the application clone the repository using `git clone`.
- Next you must create a mongoDB database To connect to the database as well as to form the JWT use environment variables, you can define them in the `.env` file or set them directly.
- To load all packages and modules use the `npm init` command.
- The server is started with the `npm start` command or `npm dev` to start with the `nodemon` package.
