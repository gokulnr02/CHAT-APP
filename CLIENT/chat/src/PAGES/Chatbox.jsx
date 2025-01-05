import React, { useState, useCallback, useContext } from 'react';
import InputEmoji from "react-input-emoji";
import send from '../assets/send.png'
import CommonAPI_POST from '../CommonAPI';
import { config } from '../config';
import { chatContext } from '../App';

function Chatbox(props) {

  const [text, setText] = useState("");
  const uid = localStorage.getItem('uID');
  const cContext = useContext(chatContext);

  function handleOnEnter(text) {
    console.log("enter", text);
  }

  const sendMessage = useCallback(async () => {
    if (!text.trim()) return;
    const data = await cContext.contactList.data
    const selectdUser = await cContext.selectedUsers.reciverId

    const userList = await data.filter(x => x.userDetails && x.userDetails.reciverId == selectdUser)
    let chatID = userList[0]?.userDetails?.chatId

    if (!chatID) {
      console.log('new Chat created')
      chatID = await createChat(cContext.selectedUsers.reciverId)
    }

    const sendURL = `${config.Api}sendMessage`;
    const message = {
      chatId: chatID,
      senderId: uid,
      message: text.trim(),
    };
    try {
      await CommonAPI_POST({ url: sendURL, params: message });
      setText('')
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, [text]);

  const createChat = useCallback(async (id) => {
    const url = `${config.Api}Adduser`;
    const result = await CommonAPI_POST({ url, params: [{ primaryUser: uid, selectdUser: id }] })
    return result.data._id
  }, [])

  const chat = cContext.contactList.data.filter(x => x.userDetails?.chatId == cContext.selectedUsers.chatId)[0]

  return (
    <div className='chatBOX'>
      <div className='chatBoxheader'>
        <div>
          {chat && chat.messages && chat.messages.length > 0 && chat.messages.map((message) => {
            return (
              <div className='messageBox'>
                <div className='message' style={{ justifyContent: message.senderId == uid ? 'right' : 'left' }}>
                  <div className={message.senderId == uid ? 'sender' : 'reciver'}>{message.message}</div>
                </div>
              </div>
            )
          })}
        </div>
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
          <button className='sendArrow' onClick={() => { sendMessage() }}><img src={send} style={{ width: '25x', height: '25px' }} /></button>
        </div>
      </div>
    </div>
  )
}

export default Chatbox