import React, { useState,useCallback } from 'react';
import InputEmoji from "react-input-emoji";
import send from '../assets/send.png'
import CommonAPI_POST from '../CommonAPI';
import { config } from '../config';

function Chatbox(props) {
  console.log(props)
  const [text, setText] = useState("");
  console.log(text,'text')
  const uid = localStorage.getItem('uID'); 

  function handleOnEnter(text) {
    console.log("enter", text);
  }

  const sendMessage = useCallback(async () => {
    if (!props.selectedContact.userDetails || !text.trim()) return; // Add validation
    const sendURL = `${config.Api}sendMessage`;
    const message = {
      chatId: props.selectedContact.userDetails.chatId,
      senderId: localStorage.getItem('uID'),
      message: text.trim(),
    };
    try {
      await CommonAPI_POST({ url: sendURL, params: message });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, [props.selectedContact.userDetails, text]);
  return (
    <div className='chatBOX'>
      <div className='chatBoxheader'>
        {props.selectedContact.messages && props.selectedContact.messages.length > 0 && props.selectedContact.messages.map((message) => {
          return (
            <div className='messageBox'>
              <div className='message' style={{ textAlign: message.senderId == uid ? 'right' : 'left' }}>
                <span className={message.senderId == uid ? 'sender' : 'reciver'}>{message.message}</span>
              </div>
            </div>
          )
        })}
      </div>
      <div className='chatBoxfooter'>
        <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder="Type a message"
        />
        <div className='sendbutton'>
           <button className='sendArrow' onClick={()=>{sendMessage()}}><img src={send} style={{ width: '25x', height: '25px' }} /></button>
        </div>
      </div>
    </div>
  )
}

export default Chatbox