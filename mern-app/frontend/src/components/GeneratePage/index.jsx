import { useState } from "react";
import { postContent } from "../../../utils/backend";
import axios from 'axios';
import { Configuration, OpenAIApi, openai } from "openai";


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

    function handleInputChange(event) {
        setCreateFormData({
            ...createFormData,
            [event.target.name]: event.target.value
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const configuration = new Configuration({
            apiKey: import.meta.env.OPENAI_API_KEY,
        });
        // openai.apiKey = 'process.env.OPENAI_API_KEY';
        const prompt = `Generate caption, hashtags, and date for a social media post about an image of ${createFormData.description}`;

        const response = await openai.complete({
            engine: 'text-davinci-002',
            prompt,
            temperature: 0.7,
            maxTokens: 100,
            n: 1,
            stop: '\n',
        });

        const [generatedCaption, generatedHashtags, generatedDate] = response.choices[0].text.split('\n');

        setGeneratedData({
            caption: generatedCaption,
            hashtags: generatedHashtags,
            date: generatedDate,
        });

        setCreateFormData({
            image: '',
            description: '',
        });

        postContent({
            ...createFormData,
            caption: generatedCaption,
            hashtags: generatedHashtags,
            date: generatedDate,
        });
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
                {generatedData.caption && (
                    <div>
                        <h2>Generated Data</h2>
                        <p>Caption: {generatedData.caption}</p>
                        <p>Hashtags: {generatedData.hashtags}</p>
                        <p>Date: {generatedData.date}</p>
                    </div>
                )}
            </div>
        </>
    );
};