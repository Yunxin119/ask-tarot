import React,{useState} from 'react'
import { motion } from 'framer-motion'
import back from '../assets/cards/Back.jpg'

const TarotCard = ({card}) => {
    const [isFlipped, setIsFlipped] = useState(false)
    const cardImg = require(`../assets/cards${card.src}`)
  return (
    <motion.div
    animate={{ rotateY: isFlipped ? 180 : 0}}
    transition={{ duration: 1 }}
    style={{
        width: '200px',
        height: '300px',
        position: 'relative',
        transformStyle: 'preserve-3d',
    }}
    >
        <motion.div
            initial={{ rotateY: 180 }}
            animate={{ rotateY: 180}}
            transition={{ duration: 1 }}
            onClick={() => setIsFlipped(!isFlipped)}
            className='absolute w-full h-full rounded-lg shadow-lg'
            style={{
                backfaceVisibility: 'hidden',
            }}
            >
                <div>
                    <img src={cardImg} alt={card.name} />
                    
                </div>
            </motion.div>
        <motion.div
            animate={{ rotateY: 0 }}
            transition={{ duration: 1 }}
            onClick={() => setIsFlipped(!isFlipped)}
            className='absolute w-full h-full bg-white rounded-lg shadow-lg'
            style={{
                backfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d',
            }}
            >
                <div>
                    <img src={back} alt="back" />
                </div>
            </motion.div>
    </motion.div>
  )
}

export default TarotCard
