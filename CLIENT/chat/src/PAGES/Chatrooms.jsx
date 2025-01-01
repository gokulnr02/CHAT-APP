import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import send from '../assets/send.png'
import { useContext } from 'react';
import { chatContext } from '../App';
import profileImg from '../assets/profile (2).png';
import CommonAPI_POST from '../CommonAPI';
import { config } from '../config';
import CommonAPI_GET from './CommonAPI_GET';

const Chatrooms = forwardRef((props, ref) => {
  const [textMessage,setTextMessage] =useState('');
  const cContext = useContext(chatContext);
  const chatDetails = cContext.acitiveContact;
  const [Messages,setMessages] =useState([])
  const contactRef = useRef()
  const senderId = localStorage.getItem('uID')
  console.log(senderId,'sendID')
  useImperativeHandle(ref, () => ({
    showContact: () => {
      if (contactRef.current) {
        contactRef.current.style.visibility ='visible' 
      }
    }
  }));

  const sendMessage = useCallback(async () => {
    if (!chatDetails || !textMessage.trim()) return; // Add validation
    const sendURL = `${config.Api}sendMessage`;
    const getURL = `${config.Api}messages/${chatDetails.chatId}`;
    const message = {
      chatId: chatDetails.chatId,
      senderId: localStorage.getItem('uID'),
      message: textMessage.trim(),
    };
    try {
      await CommonAPI_POST({ url: sendURL, params: message });
      await CommonAPI_GET({ url: getURL }); // Correct key for API call
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, [chatDetails, textMessage]);
  
useEffect(()=>{
 async function getMessages(){
  const getURL = `${config.Api}messages/${chatDetails.chatId}`;
  const result = await CommonAPI_GET({ url: getURL });
  setMessages(result.data)
 }
 getMessages()
},[chatDetails])
  return (
    <>
      <div className='chatbox'>
        <div className='chatBox'>
          <div className='selectdPerson' ref={contactRef}>
            <img src={cContext.acitiveContact.profileImg} className='contactIcon' />
            <p className='contactName'>{cContext.acitiveContact.fav}</p>
          </div>
         {
          Messages && Messages.length > 0 && Messages.map((message)=>{
            return(
              <div>
                <p style={{textAlign: senderId == message.senderId ?'right':'left' }}>
                  {message.message}
                </p>
              </div>
            )
          })
         }
        </div>
        <div className='sendSomething'>
          <input type='text' className='textbox' placeholder='say something .!' value={textMessage} onChange={(e)=>{setTextMessage(e.target.value)}}/>
          <button className='sendArrow' onClick={()=>{sendMessage()}}><img src={send} style={{ width: '25x', height: '25px' }} /></button>
        </div>
      </div>
    </>
  )
})

export default Chatrooms
