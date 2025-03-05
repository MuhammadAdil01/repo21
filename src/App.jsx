import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import ChatRoom from './components/ChatRoom';
import Login from './components/Login';

const socket = io('http://localhost:5000');

function App() {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedUserName = localStorage.getItem('userName');
    const savedUserId = localStorage.getItem('userId');

    if (savedUserName && savedUserId) {
      setUserName(savedUserName);
      setUserId(savedUserId);
      setIsAuthenticated(true);
      socket.emit('joinRoom', { userName: savedUserName, userId: savedUserId });
    }
  }, []);

  const handleLogin = (name) => {
    const generatedUserId = uuidv4();
    localStorage.setItem('userName', name);
    localStorage.setItem('userId', generatedUserId);
    setUserName(name);
    setUserId(generatedUserId);
    setIsAuthenticated(true);
    socket.emit('joinRoom', { userName: name, userId: generatedUserId });
  };

  const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    setUserName('');
    setUserId('');
    setIsAuthenticated(false);
  };

  return (
    <main className='main-container'>
    <div className="app-container">
      {!isAuthenticated ? (
        <Login handleLogin={handleLogin} />
      ) : (
        <ChatRoom userName={userName} userId={userId} socket={socket} handleLogout={handleLogout} />
      )}
    </div>
      </main>
  );
}

export default App;
