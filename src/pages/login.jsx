import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (!userName.trim()) return;

        const userId = localStorage.getItem("userId") || crypto.randomUUID();
        localStorage.setItem("userId", userId);
        localStorage.setItem("userName", userName);

        navigate("/");
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Join Chat</h1>
            <input
                style={styles.input}
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name..."
            />
            <button style={styles.joinButton} onClick={handleSubmit}>Join</button>
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
        backgroundColor: "#f8f9fa",
    },
    header: {
        marginBottom: "20px",
        color: "#333",
        fontSize: "24px",
    },
    input: {
        width: "250px",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "16px",
    },
    joinButton: {
        padding: "10px 15px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
    },
};
