import { useState } from "react";
import { Link } from "react-router-dom";
import { postContent, getContent } from "../../../utils/backend";


export default function GeneratePage() {

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
            console.log(data)
            const aiResponse = data.choices[0].text

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
        setGeneratedData({
            image: '',
            description: '',
            caption: '',
        });
        postContent(generatedData)
        console.log(`posted ${generatedData.caption} to backend`)

    }
    function refreshFeed() {
        getContent()
            .then(newData => setGeneratedData(newData))
            console.log("refreshing schedule...")
    }

    // console.log(createFormData)
    return (
        <>
            <div className="flex flex-col">
                <h1>Generate Content</h1>
                <br />
                <form onSubmit={generateAi} className="flex flex-col">
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
                    <button type="submit" className="bg-slate-500 px-5 py-2 rounded text-white">Generate Post</button>
                </form>
                <br />

                <div>
                    {generatedData.caption !== "" ?
                        <div>
                            <h2>Post</h2>
                            <img src={createFormData.image}/>
                            <p>Caption: {generatedData.caption}</p>
                            <Link to="/profile" onClick={handleSubmit}>
                                <button className="bg-slate-500 px-5 py-2 rounded text-white"> 
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