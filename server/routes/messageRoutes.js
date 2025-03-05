import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: 1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

export default router;
