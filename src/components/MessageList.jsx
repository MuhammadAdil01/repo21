
function MessageList({ messages }) {
    return (
        <div style={styles.chatMessages}>
            {messages.map((msg) => (
                <div key={msg._id} style={styles.chatMessage}>
                    <strong style={styles.userName}>{msg.userName}</strong>: {msg.messageBody}
                    <span style={styles.timestamp}>
                        ({new Date(msg.createdAt).toLocaleTimeString()})
                    </span>
                </div>
            ))}
        </div>
    );
}

const styles = {
    chatMessages: {
        flex: 1,
        overflowY: "auto",
        padding: "10px",
        backgroundColor: "#f9f9f9",
        borderBottom: "1px solid #ddd",
        height: "300px",
    },
    chatMessage: {
        padding: "8px",
        marginBottom: "5px",
        borderRadius: "5px",
        backgroundColor: "#fff",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    },
    userName: {
        color: "#007bff",
        fontWeight: "bold",
    },
    timestamp: {
        fontSize: "12px",
        color: "#777",
        marginLeft: "5px",
    },
};

export default MessageList;
