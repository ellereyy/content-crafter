import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { updateCurrentUser, getCurrentUser } from '../../../utils/backend'

export default function ProfilePage({ user }) {
  const navigate = useNavigate();

  const [editPreferences, setEditPreferences] = useState(false)
  const [userPreferences, setUserPreferences] = useState({
    name: user.name,
    handle: user.handle,
    goals: user.goals,
  })

  function handleInputChange(event) {
    setUserPreferences({
        ...userPreferences,
        [event.target.name]: event.target.value
    });
  }

  function handleSubmit(event) {
    event.preventDefault()
    setEditPreferences(false)
    updateCurrentUser(userPreferences, user._id)
      .then
    // navigate('/generate')
  }
  

  return (
    <div className="bg-slate-100 rounded-xl shadow-xl p-5 m-3">

      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <h2 className="text-lg mb-4 font-bold">Welcome, {user.name}!</h2>


      {editPreferences === false ? (
        <div>
          <div className="flex flex-col mb-4">
            <p className="text-sm font-medium text-gray-600 mb-2">Name:</p>
            <p className="text-lg font-bold mb-2">{user.name}</p>
          </div>
          <div className="flex flex-col mb-4">
            <p className="text-sm font-medium text-gray-600 mb-2">Instagram Handle:</p>
            <p className="text-lg font-bold mb-2">{user.handle}</p>
          </div>
          <div className="flex flex-col mb-4">
            <p className="text-sm font-medium text-gray-600 mb-2">Goals:</p>
            <p className="text-lg font-bold mb-2">{user.goals}</p>
          </div>
          <button 
            onClick={() => { setEditPreferences(true) }}
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
            Edit User Preferences
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
            <input 
              type="text"
              name="name" 
              value={userPreferences.name} 
              onChange={handleInputChange} 
              className="px-3 py-2 rounded-lg border-2 border-gray-300 w-full focus:outline-none focus:border-teal-500" 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="handle" className="block text-gray-700 font-bold mb-2">Instagram Handle:</label>
            <input 
              type="text"
              name="handle"
              value={userPreferences.handle} 
              onChange={handleInputChange} 
              className="px-3 py-2 rounded-lg border-2 border-gray-300 w-full focus:outline-none focus:border-teal-500" 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="goals" className="block text-gray-700 font-bold mb-2">Goals:</label>
            <textarea 
              name="goals" 
              value={userPreferences.goals} 
              onChange={handleInputChange} 
              className="px-3 py-2 rounded-lg border-2 border-gray-300 w-full focus:outline-none focus:border-teal-500"
            />
          </div>
          <button 
            type="submit" 
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          >
            Save Profile
          </button>
        </form>

      )}
    </div>
  )
}
