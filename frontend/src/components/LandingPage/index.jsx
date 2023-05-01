import { Link } from "react-router-dom";

export default function LandingPage({ user }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  let welcome = <p className="text-xl">Welcome! Join Socai to start creating and scheduling your social media content today.</p>;

  if (isAuthenticated === "true") {
    welcome = <p className="text-xl">Hello {user.name}! Create a new post or view your scheduled posts.</p>;
  }

  if (isAuthenticated === "true" & user.name === undefined) {
    welcome = <p className="text-xl">Welcome! Get Started</p>;
  }

  // console.log(user.email)

  return (
    <div className="flex flex-col items-center justify-center">

      <div className="w-full max-w-md bg-slate-100 rounded-lg shadow-lg p-10 m-10">
        <h1 className="text-3xl font-bold text-center">Socai</h1>

        <div className="text-center py-5">
          {welcome}
        </div>

        <div>
          {isAuthenticated === "true" ? (
            <div className="flex flex-col items-center justify-center">
              <Link to="/profile" className="bg-teal-400 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded mb-4">
                View/edit profile
              </Link>
              <Link to="/generate" className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded mb-4">
                Create a new post
              </Link>
              <Link to="/content" className="bg-teal-700 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded">
                View/edit scheduled posts
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Link to="/auth/login" className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded mb-4">
                Log in
              </Link>
              <Link to="/auth/signup" className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
                Sign up
              </Link>
            </div>
          )}
        </div>

      </div>

    </div>
  );
  
}
