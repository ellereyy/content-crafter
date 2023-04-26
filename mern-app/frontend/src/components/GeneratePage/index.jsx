import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postContent, getContent } from "../../../utils/backend";

export default function GeneratePage() {

    const API_KEY_DISP = import.meta.env.VITE_OPENAI_KEY
    const navigate = useNavigate();

    const [createFormData, setCreateFormData] = useState({
        image: '',
        description: '',
    });

    const [generatedData, setGeneratedData] = useState({
        image: '',
        description: '',
        caption: '',
        hashtags: '',
        date: '',
    });

    function handleInputChange(event) {
        setCreateFormData({
            ...createFormData,
            [event.target.name]: event.target.value
        });
    }

    const APIBody = {
        "model": "text-davinci-003",
        "prompt": `Generate a caption with hashtags for an Instagram post about the following image: ${createFormData.description}. Make sure the caption is catchy, includes important details about the image and is optimized for maximum engagement.`,

        "temperature": 0,
        "max_tokens": 200,
        "top_p": 1.0,
        "frequency_penalty": 0.5,
        "presence_penalty": 0.0
    }
    
    async function generateAi(event) {
        event.preventDefault()
        console.log('calling ai api....')
        await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY_DISP}`
            },
            body: JSON.stringify(APIBody)
        })
            .then((data) =>  {
            return data.json()
        })
            .then((data) => {
            const aiResponse = data.choices[0].text.trim()
            console.log(aiResponse)
            setGeneratedData({
                image: createFormData.image,
                description: createFormData.description,
                caption: aiResponse,
            })
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        postContent(generatedData)
            .then(() => {
                console.log(`posted ${generatedData.caption} to backend`)
                navigate('/')
            })
    }

    // console.log(createFormData)
    return (
        <>
            <div className="flex flex-col bg-slate-100 rounded-xl shadow-xl p-5 m-3">
                <h1 className="text-2xl font-bold mb-6">Generate Content</h1>
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
                    <button type="submit" className="bg-slate-500 text-white px-5 py-2 rounded mt-4">
                        Generate Post
                    </button>
                </form>
                <div className="mt-4">
                    {generatedData.caption !== "" ?
                        <div>
                            <h2 className="text-xl font-bold mb-2">Post</h2>
                            <img src={createFormData.image} className="mb-2" />
                            <p className="mb-2"><span className="font-bold">Caption:</span> {generatedData.caption}</p>
                            <Link to="/profile">
                                <button onClick={handleSubmit} className="bg-slate-500 text-white px-5 py-2 rounded">
                                    Add to Calendar
                                </button>
                            </Link>
                        </div>
                        : null
                    }
                </div>
            </div>
        </>
    );
};

            // console.log(generatedCaption)
            // console.log(generatedHashtags)
            // console.log(generatedDate)

                        // const generatedCaption = data.choices[0].text.split('\n')[0]
            // const generatedHashtags = data.choices[0].text.split('\n')[1]
            // const generatedDate = data.choices[0].text.split('\n')[2]