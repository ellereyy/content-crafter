import { useState } from "react";
import { postContent } from "../../../utils/backend";

const API_KEY_DISP = import.meta.env.REACT_APP_API_KEY_DISP

export default function GeneratePage() {

    const [createFormData, setCreateFormData] = useState({
        image: '',
        description: '',
    });
    const [generatedData, setGeneratedData] = useState({
        caption: '',
        hashtags: '',
        date: '',
    });
    // const [fullPostObject, setFullPostObject] = useState({
    //     image: '',
    //     description: '',
    //     caption: '',
    //     hashtags: '',
    //     date: '',
    // });

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
            // const generatedCaption = data.choices[0].text.split('\n')[0]
            // const generatedHashtags = data.choices[0].text.split('\n')[1]
            // const generatedDate = data.choices[0].text.split('\n')[2]
            console.log(aiResponse)
            // console.log(generatedCaption)
            // console.log(generatedHashtags)
            // console.log(generatedDate)
            setGeneratedData({
                caption: aiResponse,
            })
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        setGeneratedData({
            image: createFormData.image,
            description: createFormData.description,
            caption: '',
            hashtags: '',
            date: '',
        });
        postContent(generatedData)
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
                    <button type="submit" className="bg-slate-400">Generate Post</button>
                </form>
                <br />

                <div>
                    {generatedData.caption !== "" ?
                        <div>
                            <h2>Post</h2>
                            <img src={createFormData.image}/>
                            <p>Caption: {generatedData.caption}</p>
                            {/* <p>Hashtags: {generatedData.hashtags}</p>
                            <p>Date: {generatedData.date}</p> */}
                            <button onClick={handleSubmit} className="bg-slate-400"> 
                                Add to Calendar
                            </button>
                        </div>
                        : null
                    }
                </div>
                {/* <p> {generatedData} </p> */}


            </div>
        </>
    );
};