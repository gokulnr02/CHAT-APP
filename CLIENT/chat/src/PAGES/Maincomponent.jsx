import React, { useEffect, useState } from 'react'
import menuIcon from '../assets/main/Menu Icon.png'
import Chats from '../assets/main/Chats.svg'
import CommonAPI_POST from '../CommonAPI'

export default function Maincomponent() {

  const [contactList, setcontactList] = useState([])
  useEffect(() => {
    async function fetchFavList() {
      try {
        const url = `http://127.0.0.1:5002/fav`;
        const favList = await CommonAPI_POST({
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

  return (
    <div className='Maincomponent'>
      <div className='topViewChat'>
        <div className='leftSideMain'>
          <div className='leftTop'>
            <img src={menuIcon} className='menuICON' />
            <div className='searchDiv'><input type='text' placeholder='search' /></div>
          </div>
        </div>

        <div className='rightSide'>
          <div className='rightSideMain'>
            <div className='IndividualContact1'>
              <img src='' className='contactListIcon1' />
              <div className='contactNameDiv'>
                <p className='contactName' data-name='Gokul'> Gokul</p>
                <p className='LastMessage1'>Chatgram Web was updated.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='contactListFav'>
        {/* Contact List  */}
        <div className='contactList'>
          {
            contactList.length > 0 && contactList.map((x) => {
              return (
                <di v className='IndividualContact' >
                  <img src='' className='contactListIcon' />
                  <div className='contactNameDiv'>
                    <p className='contactName' data-name='Gokul'> {x.fav}</p>
                    <p className='LastMessage1'>Chatgram Web was updated.</p>
                  </div>
                </di>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
