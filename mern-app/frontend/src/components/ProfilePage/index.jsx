import { useState } from 'react'

export default function ProfilePage() {
  const [name, setName] = useState('')
  const [handle, setHandle] = useState('')
  const [goal, setGoal] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    // Do something with the form data (e.g., submit it to a backend API)
    console.log({ name, handle, goal })
  }

  return (
    <div className="bg-emerald-400 p-4">

      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-bold mb-2">Name</label>
          <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="px-2 py-1 rounded w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="handle" className="block font-bold mb-2">Instagram Handle</label>
          <input type="text" id="handle" value={handle} onChange={e => setHandle(e.target.value)} className="px-2 py-1 rounded w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="goal" className="block font-bold mb-2">Primary Goal of Instagram Account</label>
          <textarea id="goal" value={goal} onChange={e => setGoal(e.target.value)} className="px-2 py-1 rounded w-full"></textarea>
        </div>
        <button type="submit" className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">
          Save Profile
        </button>
      </form>
    </div>
  )
}
