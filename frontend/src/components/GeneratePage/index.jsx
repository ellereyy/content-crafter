import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
        creative: '',
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

    let dateFx = function() {
        const currentDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
        const futureDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
        const randomDate = new Date(currentDate.getTime() + Math.random() * (futureDate.getTime() - currentDate.getTime()));
        const datePicker = randomDate.toISOString().slice(0, 10);
        return datePicker
    }

    const currentDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
    const futureDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
    const randomDate = new Date(currentDate.getTime() + Math.random() * (futureDate.getTime() - currentDate.getTime()));
    const datePicker = randomDate.toISOString().slice(0, 10);

    // console.log('DATE PICKER: ' + datePicker())

    const APIBody = {
        "model": "text-davinci-003",
        "prompt": `Create an instagram caption for a company called ${user.businessName} in the ${user.industry} industry with the following information about a photo:\n\nImage Description: ${createFormData.description}\nPrimary marketing goal: ${createFormData.goals}\nSecondary marketing goal: ${createFormData.keywords}\nTarget Audience: ${createFormData.targetAudience}\nAdditonal creative direction: ${createFormData.creative}\n\nCaption: `,
        "temperature": 0.7,
        "max_tokens": 300,
        "top_p": 1.0,
        "frequency_penalty": 0.2,
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
            // console.log('data choices:', data.choices)
            if (createFormData.image) {
                setGeneratedData({
                    image: createFormData.image,
                    description: createFormData.description,
                    keywords: createFormData.keywords,
                    targetAudience: createFormData.targetAudience,
                    goals: createFormData.goals,
                    caption: aiResponse,
                    date: datePicker,
                })
            } else {
                setGeneratedData({
                    image: 'https://images.pexels.com/photos/2180820/pexels-photo-2180820.jpeg',
                    description: createFormData.description,
                    keywords: createFormData.keywords,
                    targetAudience: createFormData.targetAudience,
                    goals: createFormData.goals,
                    caption: aiResponse,
                    date: datePicker,
                })
            }
        })
        .finally(() => setLoading(false))
    }

    // console.log(createFormData.image)

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
        <div className='mt-3'>
            {/* <h1 className="text-2xl font-bold mb-6">Generate Content</h1> */}
            <div className="flex flex-col bg-slate-100 rounded-xl shadow-xl p-5 m-3">
                <div className="mb-3">
                    <h1 className="text-2xl font-bold pb-1">Content Generator</h1>
                    <p>Use this tool to generate content for your social media posts. Simply enter an image url and a description of the image, and we'll generate a caption for you!</p>
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
                        Target Audience:
                        <input 
                            name="targetAudience"
                            placeholder="age, gender, location, etc."
                            value={createFormData.targetAudience}
                            onChange={handleInputChange}
                            className="border border-gray-400 p-2 rounded mt-2"
                        />
                    </label>
                    <label className="flex flex-col mb-2"> Goals: 
                        <label className="p-1">
                            <input 
                                type="radio" 
                                name="goals" 
                                value="Increase engagement" 
                                onChange={handleInputChange}
                                checked={createFormData.goals === "Increase engagement"} 
                                className="mr-2"
                            />
                            Increase engagement
                        </label>
                        <label className="p-1">
                            <input 
                                type="radio" 
                                name="goals" 
                                value="Drive website traffic" 
                                onChange={handleInputChange}
                                checked={createFormData.goals === "Drive website traffic"} 
                                className="mr-2"
                            />
                            Drive website traffic
                        </label>
                        <label className="p-1">
                            <input 
                                type="radio" 
                                name="goals" 
                                value="Boost sales" 
                                onChange={handleInputChange}
                                checked={createFormData.goals === "Boost sales"} 
                                className="mr-2"
                            />
                            Boost sales
                        </label>
                        <label className="p-1">
                            <input 
                                type="radio" 
                                name="goals" 
                                value="Increase brand awareness" 
                                onChange={handleInputChange}
                                checked={createFormData.goals === "Increase brand awareness"} 
                                className="mr-2"
                            />
                            Increase brand awareness
                        </label>
                        <label className="p-1">
                            <input 
                                type="radio" 
                                name="goals" 
                                value="Highlight new products or services" 
                                onChange={handleInputChange}
                                checked={createFormData.goals === "Highlight new products or services"} 
                                className="mr-2" 
                            />
                            Highlight new products or services
                        </label>
                    </label>
                    <label className="flex flex-col mb-2">
                        Elaborate on any additional goals you may have for this post:
                        <textarea 
                            name="keywords"
                            placeholder='i.e. "promote our flash sale"'
                            value={createFormData.keywords}
                            onChange={handleInputChange}
                            className="border border-gray-400 p-2 rounded mt-2"
                        />
                    </label>
                    <label className="flex flex-col mb-2">
                        Any additional thoughts on the creative direction? Add it here:
                        <textarea 
                            name="creative"
                            placeholder='i.e. "use a playful voice, focus on humor" or "add emojis" or "include at least 5 puns"'
                            value={createFormData.creative}
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
                            <div className="flex flex-col items-center mt-5">
                                <button 
                                    onClick={handleSubmit} 
                                    className="my-2 w-full bg-teal-500 text-white px-5 py-2 rounded hover:bg-slate-600"
                                >
                                    Add to Calendar
                                </button>
                                <div className="w-full flex">
                                    <button 
                                        onClick={generateAi} 
                                        className="m-2 w-full text-xs bg-slate-400 text-white px-5 py-2 rounded hover:bg-slate-600"
                                    >
                                        Generate new caption
                                    </button>
                                    <button 
                                        onClick={() => window.location.reload()}
                                        className="m-2 w-full text-xs bg-slate-400 text-white px-5 py-2 rounded hover:bg-slate-600"
                                    >
                                        Start Over
                                    </button>
                                </div>
                            </div>
                        </div>
                        : null
                    }
                </div>

            </div>
        </div>
    );
};