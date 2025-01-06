import React, { useState, useCallback, useContext,useEffect } from 'react';
import InputEmoji from "react-input-emoji";
import send from '../assets/send.png'
import CommonAPI_POST from '../CommonAPI';
import { config } from '../config';
import { chatContext } from '../App';
import io from 'socket.io-client';

function Chatbox(props) {

  const [socket, setSocket] = useState(null);
  const [text, setText] = useState('');
  function handleOnEnter(text) {
    console.log("enter", text);
  }
  const cContext = useContext(chatContext);
  const uid = localStorage.getItem('uID');
  const SOCKET_SERVER_URL = 'http://localhost:5002';

  useEffect(() => {
    const socketInstance = io(SOCKET_SERVER_URL, {
      query: {
        username: localStorage.getItem('username'),
        primeId: uid,
      },
    });
    setSocket(socketInstance);

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [uid]);

  const sendMessage = useCallback(async () => {
    if (!text.trim()) return;

    try {
      const data = cContext?.contactList?.data || [];
      const selectedUserId = cContext?.selectedUsers?.reciverId;

      if (!selectedUserId) {
        console.error('No recipient selected');
        return;
      }

      const userList = data.filter(
        (x) => x.userDetails && x.userDetails.reciverId === selectedUserId
      );

      let chatID = userList[0]?.userDetails?.chatId;

      if (!chatID) {
        console.log('Creating a new chat');
        chatID = await createChat(selectedUserId);
      }

      const message = {
        chatId: chatID,
        senderId: uid,
        message: text.trim(),
      };

      if (socket) {
        socket.emit('sendMessage', message);
        setText('');
      } else {
        console.error('Socket is not connected');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, [text, socket, cContext, uid]);

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