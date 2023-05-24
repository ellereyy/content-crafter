import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import HomePage from '../HomePage/index.jsx'
import ProfilePage from '../ProfilePage/index.jsx'
import GeneratePage from '../GeneratePage/index.jsx'
import ContentSchedulePage from '../ContentSchedulePage/index.jsx'
import Card from '../Card/index.jsx'
import DetailsPage from '../DetailsPage/index.jsx'
import AuthFormPage from '../AuthFormPage'
import LandingPage from '../LandingPage/index.jsx'

import { getContent, getCurrentUser } from '../../../utils/backend.js'
import '../../index.css'

function App() {

  const [content, setContent] = useState([])
  const [detailsPage, setDetailsPage] = useState([])
  const [user, setUser] = useState({});
  

  let isAuthenticated = localStorage.getItem("isAuthenticated")
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated === 'true') {
      getCurrentUser()
        .then(user => { 
          setUser(user)
        })
    }
  }, [location]);

  useEffect(() => {
    if (isAuthenticated === 'true') {
      getContent()
        .then(content => {
          setContent(content)
        })
    }
  }, [location])
  
  let sortedContent = content.sort((a, b) => new Date(a.date) - new Date(b.date));

  let postDisplay = (
    <div className='mt-3'>
      <p>No posts to display</p>
      <br />
      <Link to="/generate" className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded">
        Create a new post
      </Link>
    </div>
  )
  if (sortedContent.length > 0) {
    postDisplay = sortedContent.map((post, i) => (
      <Card key={i} user={user} postInfo={post} updateDetailsPage={setDetailsPage}/>
    ));
  }

  const currentDate = new Date();
  const thisWeek = new Date();
  thisWeek.setDate(currentDate.getDate() + 7);

  let upcomingPreview = content
    .filter(post => {
      const postDate = new Date(post.date);
      return postDate >= currentDate && postDate <= thisWeek;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  let upcomingPostsDisplay;
  if (upcomingPreview.length > 0) {
    upcomingPostsDisplay = upcomingPreview.map((post, i) => (
      <Card key={i} user={user} postInfo={post} updateDetailsPage={setDetailsPage} />
    ));
  } else {
    upcomingPostsDisplay = (
      <div className='mt-3'>
        <p>No upcoming posts</p>
      </div>
    );
  }

  function handleLogOut() {
    localStorage.removeItem("userToken");
    localStorage.setItem("isAuthenticated", false);
    setUser({});
    setContent([]);
    navigate("/")
  }

  let logOutBtn = null
  if (isAuthenticated === "true") {
    logOutBtn = <button onClick={handleLogOut} className="text-lg hover:text-xl">Log Out</button>
  }

  let helloHeader = null
  if (isAuthenticated === "true" && user.name) {
    helloHeader = (
      <div className="w-full">
          <h1 className="text-2xl font-bold my-2 py-10 px-3 text-white">
            Hello, @{user.handle}!
          </h1>
      </div>
    );
  }

  return (
    <div className="mx-11 mt-11 bg-white p-11">

      <div className="flex justify-between">
        <Link to="/" className="text-3xl font-bold text-gray-800">Socai</Link>
        {logOutBtn}
      </div>

      <div className="flex flex-col">
        {isAuthenticated === "true" ? 
          <div>
            <div className="flex justify-between">
              <Link to="/profile" className="text-center p-4 my-5 text-lg hover:bg-slate-100 rounded-lg">Profile</Link>
              <Link to="/content" className="text-center p-4 my-5 text-lg hover:bg-slate-100 rounded-lg">Scheduled Posts</Link>          
              <Link to="/generate" className="text-center p-4 my-5 text-lg hover:bg-slate-100 rounded-lg">Generate Content</Link>
            </div> 
            <div className="img-bg"> {helloHeader} </div>
          </div>
          :
          <div className="flex justify-between">
            <Link to="/about" className="text-center p-4 my-5 text-lg hover:bg-slate-100 rounded-lg">About</Link>
            <Link to="/auth/login" className="text-center p-4 my-5 text-lg hover:bg-slate-100 rounded-lg">Log In</Link>
            <Link to="/auth/signup" className="text-center p-4 my-5 text-lg hover:bg-slate-100 rounded-lg">Sign Up</Link>
          </div> 
          }
      </div> 

      <Routes>
        <Route path="/" element={<LandingPage user={user} postDisplay={postDisplay} upcomingPostsDisplay={upcomingPostsDisplay}/> } />
        <Route path="/content" element={<ContentSchedulePage postDisplay={postDisplay} detailsPage={detailsPage}/>} />
        <Route path="/content/:id" element={<DetailsPage postInfo={detailsPage} updatePosts={setDetailsPage} user={user}/>} />
        <Route path="/about" element={<HomePage />} />
        <Route path="/auth/:formType" element={<AuthFormPage />} />
        <Route path="/profile" element={<ProfilePage user={user} setUser={setUser} />} />
        <Route path="/generate" element={<GeneratePage postInfo={detailsPage} user={user}/>} />
      </Routes> 

    </div>
  )
}

export default App;