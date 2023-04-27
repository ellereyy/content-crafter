import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import HomePage from '../HomePage/index.jsx'
import ProfilePage from '../ProfilePage/index.jsx'
import GeneratePage from '../GeneratePage/index.jsx'
import ContentSchedulePage from '../ContentSchedulePage/index.jsx'
import Card from '../Card/index.jsx'
import DetailsPage from '../DetailsPage/index.jsx'
import AuthFormPage from '../AuthFormPage'


import { getContent } from '../../../utils/backend.js'


function App() {

  const [content, setContent] = useState([])
  const [detailsPage, setDetailsPage] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  const location = useLocation()

  useEffect(() => {
      getContent()
          .then(res => setContent(res))
  }, [location])

  let navLink = <Link to="/auth/login" className="text-lg hover:text-xl">Log In</Link>
  let navBtn = <button onClick={handleLogin} className="text-lg hover:text-xl">Fake Log In</button>
  if (isAuthenticated) {
    navBtn = <button onClick={handleLogout} className="text-lg hover:text-xl">Log Out</button>
  }

  function handleLogout() {
    setIsAuthenticated(false)
  }

  function handleLogin() {
    setIsAuthenticated(true)
  }


  // TO DO: improve conditional rendering for when there are no posts to display
  let postDisplay = <p>No posts to display</p>
  
  if (content.length > 0) {
    postDisplay = content
      .map((post, i) => <Card key={i} postInfo={post} updateDetailsPage={setDetailsPage}/> );
  }

  return (
    
      <div className="mx-11 mt-11 bg-white p-11">

        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Socai</h1>
          {/* {navBtn} */}
        </div>

        {isAuthenticated ? (
        <div className="flex flex-col">
          <div className="flex justify-between">
            <Link to="/profile" className="p-4 my-5 text-lg hover:bg-slate-100 rounded-lg">Profile</Link>
            <Link to="/" className="p-4 my-5 text-lg hover:bg-slate-100 rounded-lg">Scheduled Posts</Link>          
            <Link to="/generate" className="p-4 my-5 text-lg hover:bg-slate-100 rounded-lg">Generate Content</Link>
          </div>
          <div className="flex justify-between bg-teal-500 mb-5">
            <Link to="/home">Home</Link>
            <Link to="/auth/login">Log In</Link>
          </div>
        </div> 
        ) : (
        <div className="flex justify-between">
          <Link to="/home" className="p-4 my-5 text-lg hover:bg-slate-100 rounded-lg">Home</Link>
          <Link to="/auth/login" className="p-4 my-5 text-lg hover:bg-slate-100 rounded-lg">Log In</Link>
        </div> 
        )}

        {isAuthenticated ? (
          <Routes>
            <Route path="/" element={<ContentSchedulePage postDisplay={postDisplay} detailsPage={detailsPage}/>} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/auth/:formType" element={<AuthFormPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/content/:id" element={<DetailsPage postInfo={detailsPage} updatePosts={setDetailsPage}/>} />
            <Route path="/generate" element={<GeneratePage postInfo={detailsPage}/>} />
          </Routes> 
        ) : (
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/auth/:formType" element={<AuthFormPage />} />
          </Routes> 
        )}

      </div>
  )
}

export default App;


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