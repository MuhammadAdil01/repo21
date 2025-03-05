# Realtime Group Chat App

## Overview

This application allows users to join a group chat in real-time. Users can:

- Enter a chat room with any given name into the input.
- Send & receive messages with minimal delay using WebSockets.
- View chat history upon joining.
- Logout and rejoin with a different name.
- All messages are saved in MongoDB & `messages.json`.

## Key Design Choices

- **WebSockets (Socket.io)** for real-time, low-latency messaging.
- **MongoDB** for message persistence.
- **localStorage** for user session management.


## Running the Project into server foler

1. Create a `.env` file with `MONGO_URI=your_mongo_connection_string`.
2. Install dependencies:
   ```bash
   npm install
   ```
   ```bash
   npm run dev
   ```


## Running the Project into root folder Frontend

1. Install dependencies:
   ```bash
   npm install
   ```
   ```bash
   npm run dev
   ```
