import React from 'react'
import menuIcon from '../assets/main/Menu Icon.png'

export default function Maincomponent() {
  return (
    <div className='Maincomponent'>
      <div>
        <div className='leftSideMain'>
          <div className='leftTop'>
            <img src={menuIcon} className='menuICON' />
            <div className='searchDiv'><input type='text' placeholder='search' /></div>
          </div>
          </div>
          <div className='IndividualContact'>
            <img src='' className='contactListIcon' />
            <div className='contactNameDiv'>
              <p className='contactName'  data-name='Gokul'> Gokul</p>
              <p className='LastMessage1'>Chatgram Web was updated.</p>
            </div>
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
  )
}
