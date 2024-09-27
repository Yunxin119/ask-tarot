import React from 'react'
import back from '../assets/cards/Back.jpg'
const TarotCardNonReveal = ({card}) => {

  return (
    <div>
        <img src={back} alt={card.name} className='border-gray-400 border-[1px] rounded-lg shadow-xl'/>
    </div>
  )
}

export default TarotCardNonReveal
