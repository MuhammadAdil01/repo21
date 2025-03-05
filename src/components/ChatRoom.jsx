import { useEffect, useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

function ChatRoom({ userName, userId, socket, handleLogout }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("messageHistory", (history) => {
            setMessages(history);
        });

        socket.on("receiveMessage", (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.off("messageHistory");
            socket.off("receiveMessage");
        };
    }, [socket]);

    return (
        <div style={styles.chatRoom}>
            <div style={styles.chatHeader}>
                <h3 style={styles.welcomeText}>Welcome, {userName}</h3>
                <button style={styles.logoutButton} onClick={handleLogout}>
                    Logout
                </button>
            </div>

            <div style={styles.messageContainer}>
                <MessageList messages={messages} />
            </div>

            <div style={styles.inputContainer}>
                <MessageInput socket={socket} userName={userName} userId={userId} />
            </div>
        </div>
    );
}

const styles = {
    chatRoom: {
        width: "400px",
        height: "600px",
        display: "flex",
        flexDirection: "column",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
        overflow: "hidden",
        margin: "auto",
    },
    chatHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px",
        backgroundColor: "#007bff",
        color: "#fff",
        fontWeight: "bold",
    },
    welcomeText: {
        margin: 0,
        fontSize: "18px",
    },
    logoutButton: {
        backgroundColor: "#ff4d4d",
        border: "none",
        color: "#fff",
        padding: "8px 12px",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "14px",
        transition: "0.3s",
    },
    messageContainer: {
        flex: 1,
        overflowY: "auto",
        padding: "10px",
    },
    inputContainer: {
        padding: "10px",
        backgroundColor: "#fff",
        borderTop: "1px solid #ddd",
    },
};

export default ChatRoom;
