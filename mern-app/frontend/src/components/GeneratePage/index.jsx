import { useState } from "react";
import { postContent } from "../../../utils/backend";

const API_KEY = import.meta.env.VITE_OPENAI_KEY;
console.log(API_KEY);
console.log(API_KEY_DISP)

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

    function handleSubmit(event) {
        event.preventDefault();
        postContent({
            ...createFormData,
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

                <div>
                </div>
                {generatedData.caption && (
                    <div>
                        <h2>New Post</h2>
                        <p>Caption: {createFormData.caption}</p>
                        <p>Hashtags: {generatedData.hashtags}</p>
                        <p>Date: {generatedData.date}</p>
                    </div>
                )}

            </div>
        </>
    );
};