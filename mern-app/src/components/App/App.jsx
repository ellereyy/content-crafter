import { Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import HomePage from '../HomePage/index.jsx'
import ProfilePage from '../ProfilePage/index.jsx'

import Button from '../ui/button.jsx'
import NavBar from '../ui/NavBar.jsx'

function App() {

  return (
      <div className="w-screen">

        <div className="bg-teal-800 text-white py-11 flex justify-between px-11">
          <h1>Craftai</h1>
          <Link to="/">Home</Link>
        </div>

        <div className="flex w-screen">

          <NavBar />

          <div className="w-3/4 bg-white rounded-xl m-5 p-5">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </div>

        </div>

      </div>
  )
}

export default App;