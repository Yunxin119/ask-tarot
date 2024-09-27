import React from 'react'
import SelectCards from './pages/SelectCards'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/select-cards' element={<SelectCards />} />
    </Routes>
    </>
  )
}

export default App
