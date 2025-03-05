import { useState } from "react";

function MessageInput({ socket, userName, userId }) {
    const [message, setMessage] = useState("");

    const sendMessage = () => {
        if (!message.trim()) return;
        socket.emit("sendMessage", { userId, userName, messageBody: message });
        setMessage("");
    };

    return (
        <div style={styles.chatInput}>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                style={styles.input}
            />
            <button onClick={sendMessage} style={styles.sendButton} disabled={!message.trim()}>
                Send
            </button>
        </div>
    );
}

const styles = {
    chatInput: {
        display: "flex",
        alignItems: "center",
        padding: "10px",
        backgroundColor: "#fff",
        borderTop: "1px solid #ddd",
    },
    input: {
        flex: 1,
        padding: "10px",
        fontSize: "16px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        outline: "none",
        marginRight: "10px",
    },
    sendButton: {
        padding: "10px 15px",
        fontSize: "16px",
        borderRadius: "5px",
        border: "none",
        backgroundColor: "#007bff",
        color: "#fff",
        cursor: "pointer",
        transition: "0.3s",
        fontWeight: "bold",
        disabled: {
            backgroundColor: "#ccc",
            cursor: "not-allowed",
        },
    },
};

export default MessageInput;