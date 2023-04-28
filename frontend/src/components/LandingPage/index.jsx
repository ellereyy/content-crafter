export default function LandingPage() {

    let isAuthenticated = localStorage.getItem("isAuthenticated")

    let welcome = <p>Welcome @NonUser! Join Socai</p>

    if (isAuthenticated === "true" ) {
        welcome = <p>Hello NewUser or ReturningUser</p>
    } 

    return (
        <div>
            {isAuthenticated === "true" ? <p className="text-lg">Welcome back!</p> : <p className="text-lg">Please log in or sign up</p>}
            <br />
            {welcome}
        </div>
    )
}