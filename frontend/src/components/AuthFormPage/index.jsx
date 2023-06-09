import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { signUp, logIn } from "../../../utils/backend"

export default function AuthFormPage() {
    // Store the form data
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // Determine which action should be taken depending on the URL
    const { formType } = useParams()

    const navigate = useNavigate();

    // Update the form as a user types
    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    // Execute auth logic on form submit
    async function handleSubmit(event) {
        event.preventDefault()
        // check what the URL parameter is to determine what request to make
        if (formType === 'login') {
            const { token } = await logIn(formData)
            localStorage.setItem('userToken', token)
            localStorage.setItem('isAuthenticated', true)
        } else {
            const { token } = await signUp(formData)
            localStorage.setItem('userToken', token)
            localStorage.setItem('isAuthenticated', true)
        }
        navigate('/')
    }

    // Condtionally render the form title and submit button text
    let actionText
    formType === 'login' ? actionText = 'Log In' : actionText = 'Sign Up'

    return (
        <div>
            

            <div className="flex items-center justify-center">
                <div className="bg-gray-800 rounded-lg shadow-xl m-11 p-8 w-full max-w-md">
                    <h2
                        className="text-3xl text-center font-bold text-gray-100 mb-8">
                        {actionText}
                    </h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-100 font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="w-full p-2 text-gray-900 rounded-md focus:outline-none focus:ring focus:border-blue-600"
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-100 font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="w-full p-2 text-gray-900 rounded-md focus:outline-none focus:ring focus:border-blue-600"
                                id="password"
                                name="password"
                                type="password"
                                minLength="6"
                                required
                                placeholder="Password"
                                autoComplete="suggested-password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-teal-700 text-gray-100 rounded-md hover:bg-teal-800 transition duration-300">
                                {actionText}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}