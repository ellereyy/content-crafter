import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <div className="bg-teal-800 text-white flex flex-col w-1/5">
            <div className="flex flex-col text-right pr-8 py-11">
                <Link to="/" className="py-9">Home</Link>
                <Link to="/profile" className="py-9">Profile</Link>
                <Link to="/content" className="py-9">Content</Link>
                <Link to="/generate" className="py-9">Generate Content</Link>
            </div>
        </div>
    )
}