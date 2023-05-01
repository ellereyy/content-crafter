import { Link } from "react-router-dom";

export default function LandingPage({ user }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  let welcome = <p className="text-xl">Welcome! Join Socai to start creating and scheduling your social media content today.</p>;

  if (isAuthenticated === "true") {
    welcome = <p className="text-xl">Hello {user.name}! Create a new post or view your scheduled posts.</p>;
  }

  if (isAuthenticated === "true" & user.name == null) {
    welcome = (
      <div>
        <p className="text-xl">Welcome to Socai! Get started by following these steps: </p>
        <br />
        <p>1. Update your profile settings by selecting "view/edit profile" </p>
        <p>2. Head over to "Generate Content" and let Socai start creating your social media content!</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center">

      <div className="w-3/4 p-10 m-10">
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
        
        <div className="mt-8 mx-4">
          <p className="italic">Sample Post:</p>
          <div className="bg-white rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-1 transition-all duration-300 my-5">
            <img src='https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' className="w-full h-64 object-cover" />
            <p className="text-gray-700 text-base p-5"><strong>@sample-account </strong> Looking for a new hiking challenge? Our backcountry guides can take you on an adventure you'll never forget! From crossing rivers to scaling mountains, we'll help you push your limits and experience the beauty of nature like never before.</p>
            <p className="px-5 pb-3 font-bold">5/8/2023</p>
          </div>
        </div>

      </div>
    </div>
  );
}
