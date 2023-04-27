import { useState } from 'react'

export default function ProfilePage() {
  const [name, setName] = useState('')
  const [handle, setHandle] = useState('')
  const [goal, setGoal] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    // add to db 
    console.log({ name, handle, goal })
  }

  return (
    <div className="bg-slate-100 rounded-xl shadow-xl p-5 m-3">

      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-bold mb-2">
            Name
          </label>
          <input 
            name="name" 
            value={name} 
            onChange={event => setName(event.target.value)} 
            className="px-2 py-1 rounded w-full border" 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="handle" className="block font-bold mb-2">
            Instagram Handle
          </label>
          <input 
            name="handle"
            value={handle} 
            onChange={event => setHandle(event.target.value)}
            className="px-2 py-1 rounded w-full" 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="goal" className="block font-bold mb-2">Goals</label>
          <textarea 
            name="goal" 
            value={goal} 
            onChange={event => setGoal(event.target.value)} 
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
