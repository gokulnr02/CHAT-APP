import React, { useEffect, useState } from 'react'
import menuIcon from '../assets/main/Menu Icon.png'
import Chats from '../assets/main/Chats.svg'
import CommonAPI_GET from './CommonAPI_GET';
import Chatbox from './Chatbox';

export default function Maincomponent() {

  const [contactList, setcontactList] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  
  useEffect(() => {
    async function fetchFavList() {
      try {
        const url = `http://127.0.0.1:5002/chat/${localStorage.getItem('uID')}`;
        const favList = await CommonAPI_GET({
          url,
          params: { _id: localStorage.getItem('uID') }
        });
        setcontactList(favList.data);
      } catch (error) {
        console.error("Error fetching favorite list:", error);
      }
    }

    fetchFavList();
  }, []);

  const handleSelectMessages = (x) => {
    console.log(x, 'x')
    setSelectedContact(x)
  }

  return (
    <div className='Maincomponent'>
      <div className='topViewChat'>
        <div className='leftSideMain'>
          <div className='leftTop'>
            <img src={menuIcon} className='menuICON' />
            <div className='searchDiv'><input type='text' placeholder='search' /></div>
          </div>
        </div>

        {selectedContact &&<div className='rightSide'>
          <div className='rightSideMain'>
            <div className='IndividualContact1'>
              <img src='https://avatar.iran.liara.run/public/boy' className='contactListIcon1' />
              <div className='contactNameDiv'>
                <p className='contactName' data-name='Gokul'> {selectedContact.userDetails.fav}</p>
                <p className='LastMessage1'>Chatgram Web was updated.</p>
              </div>
            </div>
          </div>
        </div>}
      </div>
      <div className='contactListFav'>
        {/* Contact List  */}
        <div className='contactList'>
          {
            contactList.length > 0 && contactList.map((x,i) => {
            const LastMessage =   x.messages.length > 0 ? x.messages[x.messages.length - 1].message :'';
              return (
                <div className='IndividualContact' onClick={() => { handleSelectMessages({...x,profile:`https://avatar.iran.liara.run/public/${i}`}) }}>
                  <img src={`https://avatar.iran.liara.run/public/${i}`} className='contactListIcon' />
                  <div className='contactNameDiv'>
                    <p className='contactName' data-name='Gokul'> {x.userDetails.fav}</p>
                    <p className='LastMessage1'>{LastMessage}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      { selectedContact && <Chatbox selectedContact={selectedContact} />}
      </div>
    </div>
  )
}
