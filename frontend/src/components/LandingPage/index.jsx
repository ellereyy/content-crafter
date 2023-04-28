export default function LandingPage() {

    let isAuthenticated = localStorage.getItem("isAuthenticated")

    let welcome = <p>Welcome New User!! Join Socai</p>

    if (isAuthenticated === "true" ) {
        welcome = <p>Hello Returning User! </p>
    } 

    return (
        <div>
            {isAuthenticated === "true" ? <p className="text-lg">Welcome back!</p> : <p className="text-lg">Please log in or sign up</p>}
            <br />
            {welcome}
        </div>
    )
}