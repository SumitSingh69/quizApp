import React from 'react'
import {Routes, Route } from 'react-router-dom';
import Login from './views/login'
import Questions from './views/questions'
import Result from './views/Result'
function App() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/results" element={<Result/>}/>
      </Routes>
    </div>
  )
}

export default App