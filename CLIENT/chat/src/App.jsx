import './App.css';
import Login1 from './PAGES/login1';
import Chat from './PAGES/Chat';
import Maincomponent from './PAGES/Maincomponent';
import { useState, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { io } from 'socket.io-client';

export const chatContext = createContext();

function App() {
  const SOCKET_SERVER_URL = 'http://localhost:5002';
  const [contactList, setContactList] = useState([]);
  const [activeContact, setActiveContact] = useState({});
  const [selectedUsers, setSelectedUsers] = useState(null);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL, {
      query: {
        username: localStorage.getItem('username'),
        primeId: localStorage.getItem('uID'),
      },
    });

    socket.on('chat message', (msg) => {
      try {
        setContactList(JSON.parse(msg));
      } catch (error) {
        console.error('Failed to parse chat message:', error);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  console.log('🚀 ~ App ~ selectedUsers:', contactList);

  return (
    <>
      <chatContext.Provider
        value={{
          activeContact,
          setActiveContact,
          setSelectedUsers,
          contactList,
          selectedUsers,
        }}
      >
        <Router>
          <Routes>
            <Route path='/login' element={<Login1 />} />
            <Route path='/inbox' element={<Chat />} />
            <Route path='/chat' element={<Maincomponent />} />
          </Routes>
        </Router>
      </chatContext.Provider>
    </>
  );
}

export default App;
