import { Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import HomePage from '../HomePage/index.jsx'
import ProfilePage from '../ProfilePage/index.jsx'
import GeneratePage from '../GeneratePage/index.jsx'
import ContentSchedulePage from '../ContentSchedulePage/index.jsx'

import Button from '../ui/button.jsx'
import NavBar from '../ui/NavBar.jsx'

function App() {

  return (
      <div className="mx-11 mt-11 bg-white p-11">
        <div className="flex justify-between">
          <h1>Socai</h1>
          <Link to="/">Home</Link>
        </div>

        <div className="flex justify-between">
          <Link to="/" className="py-9">Home</Link>
          <Link to="/profile" className="py-9">Profile</Link>
          <Link to="/content" className="py-9">Scheduled Posts</Link>
          <Link to="/generate" className="py-9">Generate Content</Link>
        </div>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/content" element={<ContentSchedulePage />} />
          <Route path="/generate" element={<GeneratePage />} />
        </Routes>

      </div>

    // <div className="w-screen h-screen">

    //   <div className="bg-teal-800 text-white py-11 flex justify-between px-11">
    //     <h1>Socai</h1>
    //     <Link to="/">Home</Link>
    //   </div>

    //   <div className="flex w-screen h-4/5">

    //     <NavBar />

    //     <div className="w-3/4 bg-white rounded-xl m-5 p-5">
    //       <Routes>
    //         <Route path="/" element={<HomePage />} />
    //         <Route path="/profile" element={<ProfilePage />} />
    //         <Route path="/content" element={<ContentSchedulePage />} />
    //         <Route path="/generate" element={<GeneratePage />} />
    //       </Routes>
    //     </div>

    //   </div>

    // </div>

  
  )
}

export default App;