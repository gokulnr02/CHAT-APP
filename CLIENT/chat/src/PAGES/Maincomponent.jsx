import React, { useCallback, useEffect, useState, useContext } from 'react'
import menuIcon from '../assets/main/Menu Icon.png'
import Chats from '../assets/main/Chats.svg'
import CommonAPI_GET from './CommonAPI_GET';
import Chatbox from './Chatbox';
import { IoSettingsOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { TbMessage2Plus } from "react-icons/tb";
import { HiOutlineMenu } from "react-icons/hi";
import CommonAPI_POST from '../CommonAPI';
import { config } from '../config';
import { chatContext } from '../App';

export default function Maincomponent() {

  const [contactList, setcontactList] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [menuName, setMenuName] = useState('chat');
  const [favlist, setfavList] = useState([]);


  const cContext = useContext(chatContext);
  console.log(cContext.selectedUsers, 'selectedUsers')

  useEffect(() => {
    async function getChat() {
      try {
        const url = `${config.Api}chat/${localStorage.getItem('uID')}`;
        const favList = await CommonAPI_GET({
          url,
          params: { _id: localStorage.getItem('uID') }
        });
        setcontactList(favList.data);
      } catch (error) {
        console.error("Error fetching favorite list:", error);
      }
    }

    getChat();
  }, []);

  const addUsers = useCallback(async () => {
    const url = `${config.Api}users/${localStorage.getItem('uID')}`;
    const favList = await CommonAPI_GET({
      url,
      params: { _id: localStorage.getItem('uID') }
    });
    setfavList(favList.data);
  }, [])

  const handleSelectMessages = (x) => {
    cContext.seteSelectedUsers(x.userDetails)
    setSelectedContact(x)
  }

  const submitAddUser = useCallback(async (secondaryId) => {
    const url = `${config.Api}Adduser`
    // await CommonAPI_POST({ url, params: SelectedUser })
  }, [])

  const hanldeSelectedUser = async (user) => {
    cContext.seteSelectedUsers(user);
  }

  function lastMessageTrim(text) {
    return text && text.length > 10 ? text.slice(0, 20) + '...' : text;
  }
 
  return (
    <div className='Maincomponent'>
      <div className='topViewChat'>
        <div className='ImageDiv'>   <div className='addUserDetails'><HiOutlineMenu className='contactListIcon2' /></div></div>
        <div className='leftSideMain'>

          <div className='searchDiv'><input type='text' placeholder='search' style={{ paddingLeft: '15px' }} /></div>
        </div>

        <div className='rightSide' style={{ width: selectedContact ? '75%' : '70%' }}>
          {selectedContact && <div className='rightSideMain'>
            <div className='IndividualContact1'>
              <img src='https://avatar.iran.liara.run/public/boy' className='contactListIcon1' />
              <div className='contactNameDiv'>
                <p className='contactName' data-name='Gokul'> {selectedContact.userDetails.fav}</p>
                <p className='LastMessage1'>Chatgram Web was updated.</p>
              </div>
            </div>
          </div>}
        </div>
      </div>
      <div className='contactListFav'>
        {/* Contact List  */}
        <div className='MainSetting'>
          <div className='navTop'>
            <div className='addUserDetails'><TbMessage2Plus className='contactListIcon2' onClick={() => { setMenuName('chat') }} /></div>
            <div className='addUserDetails'><FaUsers className='contactListIcon2' onClick={() => { setMenuName('addUser'); addUsers() }} /></div>
          </div>
          <div className='navBottom'>
            <div className='addUserDetails'><IoSettingsOutline className='contactListIcon2' onClick={() => { setMenuName('settings') }} /></div>
            <div className='addUserDetails'><img src='https://avatar.iran.liara.run/public/boy' className='contactListIcon1' onClick={() => { setMenuName('profile') }} /></div>
          </div>
        </div>
        <div className='contactList'>

          {
            menuName == 'chat' && contactList.length > 0 && contactList.map((x, i) => {
              const LastMessage = x.messages && x.messages.length > 0
              ? lastMessageTrim(x.messages[x.messages.length - 1].message)
              : '';
              return (
                <div className='IndividualContact' onClick={() => { handleSelectMessages({ ...x, profile: `https://avatar.iran.liara.run/public/${i}` }) }}>
                  <img src={`https://avatar.iran.liara.run/public/${i}`} className='contactListIcon' />
                  <div className='contactNameDiv'>
                    <p className='contactName' data-name={x.userDetails.fav}> {x.userDetails.fav}</p>
                    <p className='LastMessage1'>{ LastMessage}</p>
                  </div>
                </div>
              )
            })
          }
          {
            menuName == 'addUser' && favlist.length > 0 && favlist.map((x, i) => {
              return (
                <div className='IndividualContact' onClick={() => { hanldeSelectedUser(x) }}>
                  <img src={`https://avatar.iran.liara.run/public/${i}`} className='contactListIcon' />
                  <div className='contactNameDiv2'>
                    <p className='contactName' data-name={x.username}> {x.username}</p>
                    <div className='selectAddUser'></div>
                  </div>
                </div>
              )
            })
          }
        </div>
        {selectedContact && <Chatbox selectedContact={selectedContact} submitAddUser={submitAddUser} />}
      </div>
    </div>
  )
}
