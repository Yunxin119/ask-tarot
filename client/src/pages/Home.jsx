import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Home = () => {
  const [question, setQuestion] = useState('')
  const [choose, setChoose] = useState(0)
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/select-cards', { state: { question, choose } })
  }

  return (
    <div>
      <div className='fixed w-screen h-screen inset-0 bg-gray-900 bg-opacity-80'></div>
      <div className='absolute top-1/3 left-1/2 -translate-x-1/2 flex flex-col gap-5 items-center justify-center'>
        <label htmlFor='ask' className='text-2xl text-white'>What you wanna know? </label>
        <input 
          type="text" 
          className='border-gray-400 bg-opacity-50 backdrop-blur-sm bg-white border-[1px] rounded-lg shadow-xl w-[50vw] h-[6vh] p-4'
          id='ask' 
          value={question} 
          onChange={(e) => setQuestion(e.target.value)} 
        />
      </div>

      <div className='absolute bottom-0 grid grid-cols-3 w-full h-1/4 gap-3'>

      <motion.button
        whileHover={{ 
            scale: 1.1,
            boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.8)",
         }}
        whileTap={{ 
            scale: 0.9,
            boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.8)",
         }}
         onClick={() => setChoose(1)}
         
        className={`text-white rounded-lg w-full h-full relative cursor-pointer border-2 border-white border-solid ${choose === 1 ? 'bg-white text-gray-800' : 'bg-gray-300 bg-opacity-30'}`}
        style = {{
        boxShadow: choose === 1 ? '0px 0px 20px rgba(255, 255, 255, 0.8)' : ""
        }}
        >
            1 Card
        </motion.button>
        <motion.button
        whileHover={{ 
            scale: 1.1,
            boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.8)",
         }}
        whileTap={{ 
            scale: 0.9,
            boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.8)",
         }}
         onClick={() => setChoose(3)}
         
        className={`text-white rounded-lg w-full h-full relative cursor-pointer border-2 border-white border-solid ${choose === 3 ? 'bg-white text-gray-800' : 'bg-gray-300 bg-opacity-30'}`}
        style = {{
        boxShadow: choose === 3 ? '0px 0px 20px rgba(255, 255, 255, 0.8)' : ""
        }}
        >
            3 Card
        </motion.button>
        <motion.button
        whileHover={{ 
            scale: 1.1,
            boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.8)",
         }}
        whileTap={{ 
            scale: 0.9,
            boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.8)",
         }}
         onClick={() => setChoose(4)}
         
        className={`text-white rounded-lg w-full h-full relative cursor-pointer border-2 border-white border-solid ${choose === 4 ? 'bg-white text-gray-800' : 'bg-gray-300 bg-opacity-30'}`}
        style = {{
        boxShadow: choose === 4 ? '0px 0px 20px rgba(255, 255, 255, 0.8)' : ""
        }}
        >
            4 Cards
        </motion.button>
      </div>

      <button className='absolute top-[55%] left-[45%] w-[10vw] h-[10vw] rounded-full bg-gray-300 hover:bg-gray-100' style={{boxShadow: '0px 0px 20px rgba(255, 255, 255, 0.8)' }} onClick={handleNavigate}>
        Select Cards
      </button>
    </div>
  )
}

export default Home
