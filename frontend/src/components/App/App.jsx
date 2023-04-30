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

function App() {

  // const [authHeader, setAuthHeader] = useState({})
  const [content, setContent] = useState([])
  const [detailsPage, setDetailsPage] = useState([])
  const [user, setUser] = useState({});

  let isAuthenticated = localStorage.getItem("isAuthenticated")
  // console.log('Authentication satus:', isAuthenticated)
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated === 'true') {
      // console.log('3. Checking auth for user:', isAuthenticated)
      getCurrentUser()
        .then(user => { 
          setUser(user)
          console.log(`User: ${user.name}`)
        })
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated === 'true') {
      // console.log('2. Checking auth for posts:', isAuthenticated)
      getContent()
        .then(content => {
          setContent(content)
          console.log(`Content: ${content.length} posts`)
        })
    }
  }, [location])

  let postDisplay = <p>No posts to display</p>
  if (content.length > 0) {
    postDisplay = content
      .map((post, i) => <Card key={i} user={user} postInfo={post} updateDetailsPage={setDetailsPage}/> );
  }

  function handleLogOut() {
    localStorage.removeItem("userToken");
    localStorage.setItem("isAuthenticated", false);
    navigate("/");
  }

  let logOutBtn = null
  if (isAuthenticated === "true") {
    logOutBtn = <button onClick={handleLogOut} className="text-lg hover:text-xl">Log Out</button>
  }

  return (
    <div className="mx-11 mt-11 bg-white p-11">

      <div className="flex justify-between">
        <Link to="/" className="text-3xl font-bold text-gray-800">Socai</Link>
        {logOutBtn}
      </div>

      <div className="flex flex-col">
        {isAuthenticated === "true" ? 
          <div className="flex justify-between">
            <Link to="/profile" className="text-center p-4 my-5 text-lg hover:bg-slate-100 rounded-lg">Profile</Link>
            <Link to="/content" className="text-center p-4 my-5 text-lg hover:bg-slate-100 rounded-lg">Scheduled Posts</Link>          
            <Link to="/generate" className="text-center p-4 my-5 text-lg hover:bg-slate-100 rounded-lg">Generate Content</Link>
          </div> 
          :
          <div className="flex justify-between">
            <Link to="/home" className="text-center p-4 my-5 text-lg hover:bg-slate-100 rounded-lg">Home</Link>
            <Link to="/auth/login" className="text-center p-4 my-5 text-lg hover:bg-slate-100 rounded-lg">Log In</Link>
            <Link to="/auth/signup" className="text-center p-4 my-5 text-lg hover:bg-slate-100 rounded-lg">Sign Up</Link>
          </div> 
          }
      </div> 

      <Routes>
        <Route path="/" element={<LandingPage user={user} />} />
        <Route path="/content" element={<ContentSchedulePage postDisplay={postDisplay} detailsPage={detailsPage}/>} />
        <Route path="/content/:id" element={<DetailsPage postInfo={detailsPage} updatePosts={setDetailsPage} user={user}/>} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/auth/:formType" element={<AuthFormPage />} />
        <Route path="/profile" element={<ProfilePage user={user} updateUser={setUser} />} />
        <Route path="/generate" element={<GeneratePage postInfo={detailsPage} user={user}/>} />
      </Routes> 

    </div>
  )
}

export default App;


// useEffect(() => {
//   let authStatus = localStorage.getItem("isAuthenticated")
//   console.log('grabbing posts')
//   console.log(isAuthenticated)
//   if (authStatus === "true") {
//     const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
//     setAuthHeader(authHeader)
//     // console.log(localStorage.getItem('userToken'))
//     getContent(authHeader)
//       .then(res => setContent(res))
//   }
// }, [location])
