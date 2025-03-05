/* eslint-disable no-undef */
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import messageRoutes from './routes/messageRoutes.js';
import Message from './models/Message.js';
import { logMessageToJSON } from './utils/logger.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: '*' },
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('DB Connection Error:', err));

app.use(cors());
app.use(express.json());
app.use('/api/messages', messageRoutes);

// Socket.io Logic
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinRoom', async ({ userName, userId }) => {
        console.log(`${userName} joined with ID: ${userId}`);

        // Emit previous messages on joining
        const messages = await Message.find().sort({ createdAt: 1 });
        socket.emit('messageHistory', messages);
    });

    socket.on('sendMessage', async (data) => {
        const { userId, userName, messageBody } = data;
        const message = new Message({ userId, userName, messageBody });

        await message.save();

        io.emit('receiveMessage', message);

        logMessageToJSON(message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(5000, () => console.log('Server running on port 5000'));
