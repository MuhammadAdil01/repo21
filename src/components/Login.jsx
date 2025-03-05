import { useState } from "react";

function Login({ handleLogin }) {
    const [name, setName] = useState("");

    return (
        <div style={styles.loginContainer}>
            <h2 style={styles.heading}>Join Chat</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                style={styles.input}
            />
            <button 
                onClick={() => handleLogin(name)} 
                style={styles.joinButton}
                disabled={!name.trim()}
            >
                Join
            </button>
        </div>
    );
}

const styles = {
    loginContainer: {
        width: "300px",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        textAlign: "center",
        margin: "100px auto",
    },
    heading: {
        marginBottom: "15px",
        color: "#333",
    },
    input: {
        width: "100%",
        padding: "10px",
        fontSize: "16px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        marginBottom: "10px",
        outline: "none",
    },
    joinButton: {
        width: "100%",
        padding: "10px",
        fontSize: "16px",
        borderRadius: "5px",
        border: "none",
        backgroundColor: "#007bff",
        color: "#fff",
        cursor: "pointer",
        transition: "0.3s",
        fontWeight: "bold",
    },
};

export default Login;
