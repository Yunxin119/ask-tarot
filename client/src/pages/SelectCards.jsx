import React, { useState, useEffect } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { shuffle } from '../logic/shuffle'
import { tarotCards } from '../assets/tarot'
import { shuffledCards } from '../logic/shuffle'
import TarotCard from '../components/TarotCard'
import TarotCardNonReveal from '../components/TarotCardNonReveal'
import { motion } from 'framer-motion'
import { useLocation, Link } from 'react-router-dom'
import { marked} from 'marked'

const SelectCards = () => {
    const [timer, setTimer] = useState(null)
  const location = useLocation()
  const { question, choose } = location.state || {} 
  const [isLoading, setIsLoading] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [result , setResult] = useState('')
  const [callCount, setCallCount] = useState(0)
  const cards = shuffledCards
  const [pickedCards, setPickedCards] = useState([])
  const [pickedName, setPickedName] = useState([])

  const API_KEY = process.env.REACT_APP_GOOGLE_GENERATIVE_AI_API_KEY || ''
  const MAX_CALLS_PER_MINUTE = 3


  const handleCardPick = (card) => {
    if (pickedCards.length < choose) {
      const isReversed = Math.random() < 0.5;
      const reverse = isReversed ? ' - reversed' : '';
      const pickedCard = { ...card, reverse };
      setPickedCards([...pickedCards, pickedCard]);
      setPickedName([...pickedName, card.name]);
    }
  };
  
  

  useEffect(() => {
    if (pickedCards.length === choose) {
        const cardsAndMeaning = pickedCards.map((card) => `${card.name}${card.reverse}`).join(', ');
      setPrompt(`The user has asked: ${question}. Based on the ${choose} cards drawn (names and reverse statuses: ${cardsAndMeaning}), interpret the Tarot cards by referencing their meanings。
    For one card, provide a general interpretation related to the question.
    For three cards, you can use various spreads depending on the context of the question:
    The classic Past, Present, Future format can be used to explore how past influences, present circumstances, and future potential relate to the situation.
    Alternatively, for decision-making, use the Situation, Action, Outcome spread, where the first card shows the current situation, the second suggests an action to take, and the third reveals the likely outcome.
    For self-reflection, apply the Mind, Body, Spirit spread to explore the querent’s mental state, physical condition, and spiritual energy.
    For navigating challenges, use the Problem, Solution, Result spread, where the first card identifies the problem, the second offers a solution, and the third shows the result if the advice is followed.
    For four cards, choose a spread based on the question’s theme:
    If the question relates to relationships, apply the Love Spread (situation, challenges, advice, outcome). For finance or career, use the Finance Spread (current situation, obstacles, opportunities, outcome). For personal growth, use the Self-Development Spread (current self, challenges, advice, potential outcome). You can also use a holistic approach with the Mind, Body, Spirit, Potential Spread for well-being. For general problem-solving, apply the Situation, Challenge, Advice, Outcome or Insight, Challenge, Action, Result format.

    Now, review the question and interpret the cards based on the chosen format for a relevant reading.`)
    }
  }, [pickedCards, choose])

  useEffect(() => {
    if (timer === null) {
      const newTimer = setInterval(() => {
        setCallCount(0)
      }, 60000) // Reset count every 60 seconds
      setTimer(newTimer)
      // Clean up timer on component unmount
      return () => clearInterval(newTimer)
    }
  }, [timer])

  const handleReadCard = async () => {
    if (prompt === '') {
        alert('Please pick all cards needed.')
        return
    }
    if (callCount >= MAX_CALLS_PER_MINUTE) {
        alert('You have reached the maximum calls per minute. Please try again later.')
        return
    }
    // console.log('Prompt:', prompt)
    setCallCount(callCount + 1)
    await handleSendPromptToGemini(prompt)
  }

  const handleSendPromptToGemini = async (prompt) => {
    setIsLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);      
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    //   const prompt1 = "help me write a js code to format the response from the AI";
      
      const result = await model.generateContent(prompt);
      console.log(result.response.text());
        setResult(marked(result.response.text()));
    } catch (error) {
      console.error('Error fetching from Google Generative AI:', error);
      setResult('Failed to fetch response.');
    }
    setIsLoading(false);
  };
  
  return (
    <div>
        <div className='fixed w-screen h-screen bg-gray-900 bg-opacity-80 top-0 left-0 flex items-center justify-center -z-10'/>
        <Link to='/' className='absolute top-0 left-0 m-4 text-white'>Back</Link>
      <div className='mt-8'>
      <div className={`relative grid grid-cols-${choose} gap-4 w-[90%] left-[5%] right-[5%] justify-items-center align-items-center`}>
        {Array.from({ length: choose }).map((_, index) => (
          <div key={index} className="bg-gray-300 bg-opacity-40 rounded-lg w-[200px] h-[330px] shadow-lg flex items-center justify-center">
            {pickedCards[index] ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className='w-full h-full rounded-lg'
                style={{
                    transform: pickedCards[index].reverse ? 'rotate(180deg)' : 'none',
                    boxShadow: '0px 0px 20px rgba(255, 255, 255, 0.8)'
                  }}
              >
                <TarotCard card={pickedCards[index]} />
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center">Pick a card</div>
            )}
          </div>
        ))}
      </div>
      </div>



      <div className='buttons group relative left-[45%] w-[8vw] h-[8vw] mt-[2vh]'>
        <motion.button
        whileHover={{ 
            scale: 1.1,
            boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.8)",
         }}
        whileTap={{ 
            scale: 0.9,
            boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.8)",
         }}
        onClick={handleReadCard} 
        className='text-white rounded-full w-full h-full relative cursor-pointer border-2 border-white border-solid'
        >
            Read
        </motion.button>
      </div>

      <div className="overflow-x-scroll whitespace-nowrap mt-[4vh]">
        <div className="inline-flex gap-0">
            {cards.map((card) => (
            <div 
                key={card.id} 
                className={`${pickedName.includes(card.name) ? 'opacity-0' : ''} w-[170px] h-[280px] inline-block`}
                style={{ marginRight: '-130px' }} 
                onClick={() => {
                if (pickedName.includes(card.name)) {
                    return
                }
                handleCardPick(card);
                }}
            >
                <TarotCardNonReveal card={card} />
            </div>
            ))}
        </div>
        
    </div>
    { result && 
    <div className='w-screen h-screen bg-gray-900 bg-opacity-50 fixed top-0 left-0 flex items-center justify-center z-20'>
        <div className='w-[90%] h-[90%] backdrop-blur-md bg-white bg-opacity-40 p-4 rounded-lg overflow-y-scroll'>
        <div className='text-black flex flex-col items-center gap-3' dangerouslySetInnerHTML={{ __html: result }} />
        <button onClick={() => setResult('')} className='relative bg-gray-500 bg-opacity-60 text-white px-4 py-2 left-1/2 -translate-x-1/2 rounded-lg mt-4'>Close</button>
        </div>
    </div>
    }

      
    </div>
  )
}

export default SelectCards
