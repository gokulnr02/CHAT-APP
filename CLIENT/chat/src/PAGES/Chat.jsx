import React, { useCallback, useEffect, useRef, useState } from 'react';
import Contactlist from "./Contactlist";
import Chatrooms from './Chatrooms';
import menu from '../assets/menu.png';
import { useContext } from 'react';
import { chatContext } from '../App';
import profileImg from '../assets/profile (2).png';
import adduser from '../assets/add-user.png';
import user from '../assets/user.png';
import logout from '../assets/logout.png';
import CommonAPI_GET from '../PAGES/CommonAPI_GET';
import CommonAPI_POST from '../CommonAPI';


function Chat() {
    const cContext = useContext(chatContext);
    const chatDetails = cContext.acitiveContactS
    const chatboxRef = useRef();
    const settingRef = useRef();
    const [contactList, setUsersList] = useState([]);
    const AddUserRef = useRef();
    const [SelectedUser, setSelectedUser] = useState([])
    const handleShowSettins = (e) => {
        settingRef.current.style.visibility = settingRef.current.style.visibility == 'visible' ? 'hidden' : 'visible'
    }
    async function fetchUserList(primaryUserID) {
        const url = `http://127.0.0.1:5002/users/${primaryUserID}`
        const result = await CommonAPI_GET({ url });
        if (result.status == '200' && result.data.length > 0) {
            setUsersList(result.data)
        }
    }

    const handleAddUser = async () => {
        fetchUserList(localStorage.getItem('uID'))
        AddUserRef.current.style.visibility = AddUserRef.current.style.visibility == 'visible' ? 'hidden' : 'visible'
    }
    const hanldeSelectedUser = async (user) => {
        setSelectedUser(prv => ([...prv, { primaryUser: localStorage.getItem('uID'), selectdUser: user }]))
    }

    const submitAddUser = useCallback(async () => {
        const url = `http://127.0.0.1:5002/Adduser`
        await CommonAPI_POST({ url, params: SelectedUser })
    }, [SelectedUser])

    return (
        <div className='chatMainContainer'>
            <div className='flex'>
                <div className='navbar'>
                    <img src={menu} className='menuIcon' onClick={handleShowSettins} />
                </div>
                <div className='settings' ref={settingRef}>
                    <div className='induvidualIcon gap10'>
                        <img className='settingIcon' src={user}></img>
                        <span>Edit Profile</span>
                    </div>
                    <div className='induvidualIcon gap10' onClick={handleAddUser}>
                        <img className='settingIcon' src={adduser}></img>
                        <span>Add Friend</span>
                    </div>
                    <div className='induvidualIcon gap10' onClick={() => { window.location.href = '/login' }}>
                        <img className='settingIcon' src={logout}></img>
                        <span>Logout</span>
                    </div>
                </div>
            </div>
            <div className='addUserContainer' ref={AddUserRef}>
                <div className='add-btn'><button className='btn' onClick={submitAddUser} style={{ width: '40%', height: '90%', backgroundColor: '#69e0bd', fontSize: '11px', color: '#000' }}>Add User</button></div>
                {contactList.length > 0 && contactList.map((list, index) => (
                    <div className='induvidualPerson' style={{ height: '40px' }} key={index} >
                        <div><input type='checkbox' className='checkboxDesign' onClick={() => { hanldeSelectedUser(list._id) }} /></div>
                        <div className='contactIcon2'>
                            <img src={profileImg} className='contactIcon1' alt="profile" />
                        </div>
                        <div className='contactDescription' >
                            <div className='contactName1' data-name={list.contactName}>{list.username}</div>
                        </div>

                    </div>
                ))}
            </div>
            <div className='Chatcontainer'>
                <Contactlist handleShowContact={() => chatboxRef.current.showContact()} />
                <Chatrooms ref={chatboxRef} />
            </div>
        </div>
    )
}

export default Chat