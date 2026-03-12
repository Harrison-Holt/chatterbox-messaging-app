# ChatterBox Messaging Application

## Overview

ChatterBox is a full-stack messaging platform that allows users to create channels, join conversations, and exchange messages in a shared workspace environment. The application demonstrates a modern MERN-style architecture with secure authentication, channel membership management, and dynamic message updates.

The project was developed as a capstone for the UT Austin Full Stack Web Development program and focuses on implementing core full-stack concepts including REST API design, authentication, state management, and database modeling.

Live Demo: https://chatterbox.harrisonholt.dev/
---

## Features

### Authentication

* User registration and login
* Secure JWT authentication
* Protected API routes
* Persistent login state
* Logout functionality

### Channels

* Create new channels
* Browse available public channels
* Join existing channels
* Channel membership management

### Messaging

* Send messages within channels
* Display message sender username
* Timestamped messages
* Automatic message refresh after sending

### User Interface

* Responsive layout
* Material UI component styling
* Channel sidebar navigation
* Message display with timestamps

---

## Tech Stack

### Frontend

* React
* TypeScript
* Material UI
* Axios
* React Hooks

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

### Architecture

Frontend (React) communicates with a REST API built in Express, which interacts with a MongoDB database using Mongoose models.

```
React Frontend → Express API → MongoDB Database
```

---

## Project Structure

```
client/
  src/
    components/
    hooks/
    pages/
    assets/

server/
  routes/
  models/
  middleware/
```

---

## Installation

### Clone Repository

```
git clone https://github.com/Harrison-Holt/chatterbox-messaging-app.git
cd chatterbox-messaging-app
```

---

### Backend Setup

```
cd server
npm install
npm run dev
```

Create a `.env` file with:

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
```

---

### Frontend Setup

```
cd client
npm install
npm run dev
```

The application will run locally at:

```
http://localhost:5173
```

---

## API Endpoints

### Authentication

```
POST /api/auth/register
POST /api/auth/login
```

### Channels

```
GET  /api/channels/public
POST /api/channels/create
POST /api/channels/:id/join
GET  /api/channels/my
```

### Messages

```
GET  /api/channels/:id/messages
POST /api/channels/:id/messages
```

---

## Future Improvements

Potential enhancements for future versions include:

* Real-time messaging with WebSockets or Socket.IO
* Typing indicators
* Message editing and deletion
* User avatars and profiles
* Channel moderation roles
* Improved mobile responsiveness

---

## License

This project was created for educational purposes as part of the UT Austin Full Stack Web Development program.

