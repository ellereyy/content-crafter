import { Link } from 'react-router-dom'

import { handleLogout } from '../../../utils/auth.js'

export default function NavBar() {

    let navBar = (
        <div className="flex justify-between">
          <Link to="/home" className=" text-lg hover:text-xl">Home</Link>
          <Link to="/auth/login" className="p-4 my-5 text-lg hover:bg-slate-100 rounded-lg">Log In</Link>
        </div>
    )

    if (isLoggedIn) {
        navBar = (
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold text-gray-800">Socai</h1>
            <button onClick={handleLogout} className="p-4 my-5 text-lg hover:bg-slate-100 rounded-lg">Log Out</button>
          </div>
        )
    }


    return (
        <div className="bg-teal-800 text-white flex flex-col w-1/5">
            <div className="flex flex-col text-right pr-8 py-11">
                <Link to="/" className="py-9">Home</Link>
                <Link to="/profile" className="py-9">Profile</Link>
                <Link to="/content" className="py-9">Scheduled Posts</Link>
                <Link to="/generate" className="py-9">Generate Content</Link>
            </div>
        </div>
    )
}