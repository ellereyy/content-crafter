import { useState } from "react";
import { postContent } from "../../../utils/backend";


export default function GeneratePage() {

    const [createFormData, setCreateFormData] = useState({
        image: '',
        description: '',
    });
    // const [generatedData, setGeneratedData] = useState({
    //     caption: '',
    //     hashtags: '',
    //     date: '',
    // });
    const [generatedData, setGeneratedData] = useState('');

    function handleInputChange(event) {
        setCreateFormData({
            ...createFormData,
            [event.target.name]: event.target.value
        });
    }

    const APIBody = {
        "model": "text-davinci-003",
        "prompt": `Generate a caption for an instagram post about an image with the following description: ${createFormData.description}`,
        "temperature": 0,
        "max_tokens": 100,
        "top_p": 1.0,
        "frequency_penalty": 0.5,
        "presence_penalty": 0.0
    }

    async function generateAi() {
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
            console.log(data)
            setGeneratedData(data.choices[0].text.trim())
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        generateAi()
        setCreateFormData({
            image: '',
            description: '',
        });

        postContent(createFormData)
    }

    console.log(createFormData)
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
                <br />
                <button onClick={generateAi} className="bg-slate-400"> Generate AI </button>

                {/* <div>
                    {generatedData.caption !== "" ?
                        <div>
                            <h2>Generated Data</h2>
                            <p>Caption: {generatedData.caption}</p>
                            <p>Hashtags: {generatedData.hashtags}</p>
                            <p>Date: {generatedData.date}</p>
                        </div>
                        : null
                    }
                </div> */}
                <div>
                    {generatedData !== "" ?
                        <div>
                            <h2>Caption: {generatedData}</h2>
                        </div>
                        : null
                    }
                </div>


            </div>
        </>
    );
};