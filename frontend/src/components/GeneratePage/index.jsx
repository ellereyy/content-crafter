import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postContent } from "../../../utils/backend";

import '../../index.css';

export default function GeneratePage({ user }) {

    const API_KEY_DISP = import.meta.env.VITE_OPENAI_KEY
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)
    const [createFormData, setCreateFormData] = useState({
        image: '',
        description: '',
        keywords: '',
        targetAudience: '',
        goals: '',
    });
    const [generatedData, setGeneratedData] = useState({
        image: '',
        description: '',
        keywords: '',
        targetAudience: '',
        goals: '',
        caption: '',
        date: '',
    });

    const APIBody = {
        "model": "text-davinci-003",
        "prompt": `Create a social media caption for a company called ${user.businessName} with the following information about a photo:\n\nImage Description: ${createFormData.description}\nMarketing Keywords: ${createFormData.keywords}\nTarget Audience: ${createFormData.targetAudience}\nGoals of this post: ${createFormData.goals}\n\nCaption:`,

        "temperature": 0,
        "max_tokens": 200,
        "top_p": 1.0,
        "frequency_penalty": 0.5,
        "presence_penalty": 0.0
    }
    
    async function generateAi(event) {
        event.preventDefault()
        setLoading(true)
        console.log('calling ai api....')
        await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY_DISP}`
            },
            body: JSON.stringify(APIBody)
        }).then((data) =>  {
            return data.json()
        }).then((data) => {
            const aiResponse = data.choices[0].text.trim()
            console.log(aiResponse)
            setGeneratedData({
                image: createFormData.image,
                description: createFormData.description,
                keywords: createFormData.keywords,
                targetAudience: createFormData.targetAudience,
                goals: createFormData.goals,
                caption: aiResponse,
            })
        })
        .finally(() => setLoading(false))
    }

    // mock ai api call for testing 
    async function fakeGenerate(event) {
        event.preventDefault()
        setLoading(true)
        console.log('calling fake ai api....')
    
        await new Promise(resolve => setTimeout(resolve, 1000))
    
        setGeneratedData({
            image: createFormData.image,
            description: createFormData.description,
            caption: 'instagram caption goes here!! #ad',
        })
    
        setLoading(false)
    }

    function handleInputChange(event) {
        setCreateFormData({
            ...createFormData,
            [event.target.name]: event.target.value
        });
    }
    
    function handleSubmit(event) {
        event.preventDefault()
        postContent(generatedData)
            .then(() => {
                navigate('/content')
            })
    }

    return (
        <div className="flex flex-col bg-slate-100 rounded-xl shadow-xl p-5 m-3">
            <div className="mb-3">
                <h1 className="text-2xl font-bold pb-1">Generate Content</h1>
                <p>Use this tool to generate content for your social media posts. Simply enter an image url and a description of the image, and we'll generate a caption for you!</p>
            </div>
            <div className="py-4">
                <p>User Profile Information:</p>
                <p>These are your profile settings that will be used to generate content.</p>
                <p>Goals: {user.goals}</p>
            </div>
            <p className="pt-4 font-bold text-lg">Content Create Form:</p>
            <form onSubmit={generateAi} className="flex flex-col">
                <label className="flex flex-col mb-2">
                    Image:
                    <input
                        name="image"
                        placeholder="url"
                        value={createFormData.image}
                        onChange={handleInputChange}
                        className="border border-gray-400 p-2 rounded mt-2"
                    />
                </label>
                <label className="flex flex-col mb-2">
                    Description:
                    <textarea 
                        name="description"
                        placeholder="Describe your image here"
                        value={createFormData.description}
                        onChange={handleInputChange}
                        className="border border-gray-400 p-2 rounded mt-2"
                    />
                </label>
                <label className="flex flex-col mb-2">
                    Goals:
                    <textarea 
                        name="goals"
                        placeholder="What would you like to get out of this post? I.e. increase sales, or increase brand awareness"
                        value={createFormData.goals}
                        onChange={handleInputChange}
                        className="border border-gray-400 p-2 rounded mt-2"
                    />
                </label>
                <label className="flex flex-col mb-2">
                    Keywords:
                    <textarea 
                        name="keywords"
                        placeholder="add any keywords you'd like to include here"
                        value={createFormData.keywords}
                        onChange={handleInputChange}
                        className="border border-gray-400 p-2 rounded mt-2"
                    />
                </label>
                <label className="flex flex-col mb-2">
                    Target Audience:
                    <textarea 
                        name="targetAudience"
                        placeholder="age, gender, location, etc."
                        value={createFormData.targetAudience}
                        onChange={handleInputChange}
                        className="border border-gray-400 p-2 rounded mt-2"
                    />
                </label>
                <button type="submit" className="bg-slate-500 text-white px-5 py-2 rounded mt-4 hover:bg-slate-600">
                    Generate Post
                </button>
            </form>
            <div className="mt-4">
                {loading && <div className="m-11 loader"></div>}
                {generatedData.caption !== "" ?
                    <div>
                        <h2 className="text-xl font-bold mb-2">Post</h2>
                        <img src={generatedData.image} className="mb-2" />
                        <p className="mb-2"><span className="font-bold">Caption:</span> {generatedData.caption}</p>
                        <Link to="/profile">
                            <button onClick={handleSubmit} className="bg-slate-500 text-white px-5 py-2 rounded hover:bg-slate-600">
                                Add to Calendar
                            </button>
                        </Link>
                    </div>
                    : null
                }
            </div>
        </div>
    );
};

            // console.log(generatedCaption)
            // console.log(generatedHashtags)
            // console.log(generatedDate)

            // const generatedCaption = data.choices[0].text.split('\n')[0]
            // const generatedHashtags = data.choices[0].text.split('\n')[1]
            // const generatedDate = data.choices[0].text.split('\n')[2]