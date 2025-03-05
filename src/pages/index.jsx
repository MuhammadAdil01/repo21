import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:5000");

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // Ensure localStorage is accessed only in the browser
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");

    useEffect(() => {
        if (!userName) {
            navigate("/login");
            return;
        }

        socket.emit("joinRoom", { userId, userName });

        socket.on("messageHistory", (data) => {
            setMessages(data);
        });

        socket.on("receiveMessage", (newMessage) => {
            setMessages((prev) => [...prev, newMessage]);
        });

        return () => {
            socket.off("messageHistory");
            socket.off("receiveMessage");
        };
    }, [userId, userName, navigate]);

    const sendMessage = () => {
        if (!message.trim()) return;

        socket.emit("sendMessage", {
            userId,
            userName,
            messageBody: message,
        });

        setMessage("");
    };

    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        navigate("/login");
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Group Chat</h1>

            <div style={styles.chatBox}>
                {messages.map((msg) => (
                    <div key={msg._id} style={styles.message}>
                        <strong style={styles.userName}>{msg.userName}</strong>: {msg.messageBody}
                        <span style={styles.timestamp}>
                            ({new Date(msg.createdAt).toLocaleTimeString()})
                        </span>
                    </div>
                ))}
            </div>

            <div style={styles.inputContainer}>
                <input
                    style={styles.input}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button style={styles.sendButton} onClick={sendMessage}>Send</button>
                <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
    },
    header: {
        marginBottom: "10px",
        color: "#333",
    },
    chatBox: {
        width: "80%",
        height: "400px",
        overflowY: "auto",
        padding: "10px",
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "5px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    },
    message: {
        padding: "8px",
        borderBottom: "1px solid #ddd",
    },
    userName: {
        fontWeight: "bold",
        color: "#007bff",
    },
    timestamp: {
        fontSize: "12px",
        color: "#777",
        marginLeft: "5px",
    },
    inputContainer: {
        display: "flex",
        gap: "10px",
        marginTop: "10px",
    },
    input: {
        width: "60%",
        padding: "8px",
        borderRadius: "5px",
        border: "1px solid #ccc",
    },
    sendButton: {
        padding: "8px 12px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    logoutButton: {
        padding: "8px 12px",
        backgroundColor: "#dc3545",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};
