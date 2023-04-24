import { Link } from "react-router-dom"
import { useState } from "react"

import { postContent } from "../../../utils/backend"

export default function GeneratePage() {

    // state
    const [generatedPost, setGeneratedPost] = useState(null);
    const [createFormData, setCreateFormData] = useState({
        image: '',
        description: '',
        caption: '',
        hashtags: '',
        date: '',
    })

    // functions
    function handleInputChange(event) {
        setCreateFormData({
            ...createFormData,
            [event.target.name]: event.target.value
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setCreateFormData({
            image: '',
            description: ''
        })
        const newPost = await postContent({...createFormData})
        setGeneratedPost(newPost);
    }

    return (
        <>
            <div className="flex flex-col">
                <h1>Generate Content</h1>
                <br />
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <label className="flex flex-col">
                        Image:
                        <input
                            name="image"
                            placeholder="url"
                            value={createFormData.image}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label className="flex flex-col">
                        Description:
                        <textarea 
                            name="description"
                            placeholder="Describe your image here"
                            value={createFormData.description}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <button type="submit" className="bg-slate-400">Generate Post</button>
                </form>
                <div>
                    {generatedPost && (
                        <div>
                            <h2>Generated Post:</h2>
                            <img src={generatedPost.image} />
                            <p>Description: {generatedPost.description}</p>
                        </div>
                    )}
                    <Link to="/content" className="py-9">
                        <button className="bg-teal-500 p-3 my-3 rounded">
                            View in Schedule
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
};
