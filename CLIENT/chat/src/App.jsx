
import './App.css'
import Login1 from './PAGES/login1';
import Chat from './PAGES/Chat';
import Maincomponent from './PAGES/Maincomponent';
import { useState, createContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export const chatContext = createContext()

function App() {
  const [acitiveContact, setActivecontact] = useState({});
  const [selectedUsers, seteSelectedUsers] = useState(null)
  console.log("🚀 ~ App ~ selectedUsers:", selectedUsers)
  return (
    <>
      <chatContext.Provider value={{
        acitiveContact,
        AcitiveContact: (e) => setActivecontact(e),
        seteSelectedUsers: (e) => seteSelectedUsers(e),
        selectedUsers
      }}>
        <Router>
          <Routes>
            <Route path='/login' element={<Login1 />} />
            <Route path='/inbox' element={<Chat />} />
            <Route path='/chat' element={<Maincomponent />} />
          </Routes>
        </Router>
      </chatContext.Provider>

    </>
  )
}

export default App
