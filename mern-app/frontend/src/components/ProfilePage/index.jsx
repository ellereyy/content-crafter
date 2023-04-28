import { useState, useEffect } from 'react'
import { updateCurrentUser, getCurrentUser } from '../../../utils/backend'

export default function ProfilePage() {

  const [user, setUser] = useState({});
  const [userPreferences, setUserPreferences] = useState({
    name: '',
    handle: '',
    goals: '',
  })

  useEffect(() => {
    getCurrentUser()
      .then(user => setUser(user))
      // .then(console.log(user.id))
  }, []);

  let userId = user.id
  console.log(userId)

  if (!user) {
    return <p>no user data</p>;
  } 

  function handleInputChange(event) {
    setUserPreferences({
        ...userPreferences,
        [event.target.name]: event.target.value
    });
    console.log(userPreferences)
  }

  function handleSubmit(event) {
    event.preventDefault()
    updateCurrentUser(userPreferences, userId)
    console.log(userPreferences, userId)
  }

  return (
    <div className="bg-slate-100 rounded-xl shadow-xl p-5 m-3">

      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <h1>Welcome, {user.name}!</h1>


      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-bold mb-2">
            Name
          </label>
          <input 
            name="name" 
            value={userPreferences.name} 
            onChange={handleInputChange} 
            className="px-2 py-1 rounded w-full border" 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="handle" className="block font-bold mb-2">
            Instagram Handle
          </label>
          <input 
            name="handle"
            value={userPreferences.handle} 
            onChange={handleInputChange} 
            className="px-2 py-1 rounded w-full" 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="goals" className="block font-bold mb-2">Goals</label>
          <textarea 
            name="goals" 
            value={userPreferences.goals} 
            onChange={handleInputChange} 
            className="px-2 py-1 rounded w-full"
          >
          </textarea>
        </div>
        <button type="submit" className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">
          Save Profile
        </button>
      </form>
    </div>
  )
}


// useEffect(() => {
//   async function fetchData() {
//     const currentUser = await getCurrentUser();
//     setUser(currentUser);
//   }
//   fetchData();
// }, []);