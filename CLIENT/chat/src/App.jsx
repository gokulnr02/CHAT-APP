
import './App.css'
import Login from './PAGES/Login';
import Chat from './PAGES/Chat';
import { useState, createContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export const chatContext = createContext()

function App() {
const [acitiveContact,setActivecontact]=useState({})
  return (
    <>
      <chatContext.Provider value={{
        acitiveContact,
        AcitiveContact:(e)=>setActivecontact(e)
      }}>
        <Router>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/inbox' element={<Chat />} />
          </Routes>
        </Router>
      </chatContext.Provider>

    </>
  )
}

export default App
