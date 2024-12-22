import React, { useRef } from 'react';
import Contactlist from "./Contactlist";
import Chatrooms from './Chatrooms';
import menu from '../assets/menu.png';
import { useContext } from 'react';
import { chatContext } from '../App';
import profileImg from '../assets/profile (2).png';
import adduser from '../assets/add-user.png';
import user from '../assets/user.png';
import logout from '../assets/logout.png';


function Chat() {
    const cContext = useContext(chatContext);
    const chatboxRef = useRef();
    const settingRef = useRef();
   const handleShowSettins =(e)=>{
        settingRef.current.style.visibility = settingRef.current.style.visibility == 'visible' ? 'hidden' : 'visible' 
    }
    return (
        <>
            <div className='flex'>
                <div className='navbar'>
                    <img src={menu} className='menuIcon' onClick={handleShowSettins}/>
                </div>
                <div className='settings' ref={settingRef}>
                    <div className='induvidualIcon gap10'>
                        <img className='settingIcon' src={user}></img>
                        <span>Edit Profile</span>
                    </div>
                    <div className='induvidualIcon gap10'>
                        <img className='settingIcon' src={adduser}></img>
                        <span>Add Friend</span>
                    </div>
                    <div className='induvidualIcon gap10'>
                        <img className='settingIcon' src={logout}></img>
                        <span>Logout</span>
                    </div>
                </div>
            </div>
            <div className='Chatcontainer'>
                <Contactlist handleShowContact={() => chatboxRef.current.showContact()} />
                <Chatrooms ref={chatboxRef} />
            </div>
        </>
    )
}

export default Chat