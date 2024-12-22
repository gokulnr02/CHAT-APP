import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import send from '../assets/send.png'
import { useContext } from 'react';
import { chatContext } from '../App';
import profileImg from '../assets/profile (2).png'

const Chatrooms = forwardRef((props, ref) => {
  const cContext = useContext(chatContext);
  const contactRef = useRef()
  useImperativeHandle(ref, () => ({
    showContact: () => {
      if (contactRef.current) {
        contactRef.current.style.visibility ='visible' 
      }
    }
  }));


  return (
    <>
      <div className='chatbox'>
        <div className='chatBox'>
          <div className='selectdPerson' ref={contactRef}>
            <img src={cContext.acitiveContact.profileImg} className='contactIcon' />
            <p className='contactName'>{cContext.acitiveContact.contactName}</p>
          </div>
          <div className='friend'></div>
          <div className='you'></div>
        </div>
        <div className='sendSomething'>
          <input type='text' className='textbox' placeholder='say something .!' />
          <button className='sendArrow'><img src={send} style={{ width: '25x', height: '25px' }} /></button>
        </div>
      </div>
    </>
  )
})

export default Chatrooms
