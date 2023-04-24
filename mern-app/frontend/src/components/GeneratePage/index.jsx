import { useState } from "react";
import { postContent } from "../../../utils/backend";


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
    const [fullPostObject, setFullPostObject] = useState({
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
        "prompt": `Generate a caption, hashtags, and post time for an Instagram post about the following image:\n\n${createFormData.description}\n\nMake sure the caption is catchy and includes important details about the image. The hashtags should be relevant and help increase the post's visibility. The post time should be optimized for maximum engagement. Separate the caption, hashtags, and post time with a \n`,

        "temperature": 0,
        "max_tokens": 100,
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
            setGeneratedData(data.choices[0].text.trim())
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        setFullPostObject({
            image: '',
            description: '',
            caption: '',
            hashtags: '',
            date: '',
        });
        postContent(fullPostObject)
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
                            <p> {generatedData} </p>

                            <p>Caption: {generatedData.caption}</p>
                            <p>Hashtags: {generatedData.hashtags}</p>
                            <p>Date: {generatedData.date}</p>
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