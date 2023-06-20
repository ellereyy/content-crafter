import { Link } from "react-router-dom";

export default function LandingPage({ user, postDisplay, upcomingPostsDisplay }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  let welcome = <p className="text-xl">Welcome! Join Socai to start creating and scheduling your social media content today.</p>;

  let previewPost = (
    <div className="mx-4">
      <p className="italic">Sample Post:</p>
      <div className="bg-white rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-1 transition-all duration-300 my-5">
        <img src='https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' className="w-full h-64 object-cover" />
        <p className="text-gray-700 text-base p-5"><strong>@sample-account </strong> Looking for a new hiking challenge? Our backcountry guides can take you on an adventure you'll never forget! From crossing rivers to scaling mountains, we'll help you push your limits and experience the beauty of nature like never before.</p>
        <p className="px-5 pb-3 font-bold">5/8/2023</p>
      </div>
    </div>
  );

  if (isAuthenticated === "true" & user.name != null) {
    welcome = <p className="text-xl">Hello {user.name}! Create a new post or view your scheduled posts.</p>;
    previewPost = (
      <div className="pt-5">
        <p className="text-xl">Upcoming posts:</p>
        {upcomingPostsDisplay}
      </div>
    );
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

  let title;
  if (isAuthenticated === 'true') {
    title = (
      <h1 className="text-3xl font-bold text-center">Dashboard</h1>
    )
  } else {
    <h1 className="text-3xl font-bold text-center">Socai</h1>
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center m-auto px-10 mt-5">
        {title}

        <div className="text-center py-5">
          {welcome}
        </div>

        <div>
          {isAuthenticated === "true" ? (
            <div className="flex items-center justify-center">
              <Link to="/profile" className="bg-teal-400 hover:bg-teal-500 text-white text-center font-bold py-2 px-4 rounded mx-3">
                View/edit profile
              </Link>
              <Link to="/generate" className="bg-teal-500 hover:bg-teal-600 text-white text-center font-bold py-2 px-4 rounded mx-3">
                Create a new post
              </Link>
              <Link to="/content" className="bg-teal-700 hover:bg-teal-800 text-white text-center font-bold py-2 px-4 rounded mx-3">
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

      <div className="mt-8">
        {previewPost}
      </div>

    </div>
  );
}
