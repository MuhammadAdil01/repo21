import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    messageBody: { type: String, required: true },
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
export default Message;
