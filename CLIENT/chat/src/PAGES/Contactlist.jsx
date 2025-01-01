import React, { forwardRef, useEffect, useState } from 'react';
import profileImg from '../assets/profile (2).png';
import { useContext } from 'react';
import { chatContext } from '../App';
import CommonAPI_POST from '../CommonAPI';

const Contactlist = forwardRef((props, ref) => {
    const [contactList,setcontactList]=useState([])
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
    

    const cContext = useContext(chatContext);
    // const contactList = [
    //     { "contactName": "gokul vars", "lastMessage": "hello gokul", "messageRecievedTime": "9:15 AM", "badgeCount": 2, "profileImg": profileImg },
    //     { "contactName": "kathi vars", "lastMessage": "hello karthi", "messageRecievedTime": "10:15 AM", "badgeCount": 12, "profileImg": profileImg },
    //     { "contactName": "sri gokul ranjith", "lastMessage": "hello gokul", "messageRecievedTime": "10-12-24", "badgeCount": 124, "profileImg": profileImg }
    // ];

    function truncateName(name) {
        return name.length > 10 ? `${name.slice(0, 10)}...` : name;
    }
    function handleSelectContact(list) {
        console.log(list,'lift from selectdUSER')
        cContext.AcitiveContact(list)
        props.handleShowContact();
    }

    return (
        <div className='contacts'>
            {contactList.length > 0 && contactList.map((list, index) => (
                <div className='induvidualPerson' key={index} onClick={()=>handleSelectContact(list)}>
                    <div className='contactIcon' style={{ width: "60px" }}>
                        {/* <img src={profileImg} className='contactIcon' alt="profile" /> */}
                    </div>
                    <div className='contactDescription' >
                        <div className='contactName' data-name={list.fav}>{truncateName(list.fav)}</div>
                        {/* <div className='LastMessage'>{list.lastMessage}</div> */}
                    </div>
                    {/* <div className='flex coloum'>
                        <div className='messageRecievedTime'>{list.messageRecievedTime}</div>
                        <div className='badgeCount'>{list.badgeCount}</div>
                    </div> */}
                </div>
            ))}
        </div>
    );
})

export default Contactlist
