import { Link } from "react-router-dom";

export default function LandingPage() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  let welcome = <p className="text-xl">Welcome, new user! Join Socai to start creating and scheduling your social media content today.</p>;

  if (isAuthenticated === "true") {
    welcome = <p className="text-xl">Hello, returning user! Create a new post or view your scheduled posts.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-slate-100 rounded-lg shadow-lg p-6 m-10">
        <h1 className="text-3xl font-bold text-center mb-8">Socai</h1>
        {isAuthenticated === "true" ? (
          <div className="flex flex-col items-center justify-center">
            <Link to="/newpost" className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded mb-4">
              Create a new post
            </Link>
            <Link to="/scheduled" className="bg-teal-700 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded">
              View scheduled posts
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Link to="/login" className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded mb-4">
              Log in
            </Link>
            <Link to="/signup" className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
              Sign up
            </Link>
          </div>
        )}
        <div className="text-center">{welcome}</div>
      </div>
    </div>
  );
}
