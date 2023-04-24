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

    function handleInputChange(event) {
        setCreateFormData({
            ...createFormData,
            [event.target.name]: event.target.value
        });
    }

    function generateAi() {
        console.log('calling ai api....')
    }

    function handleSubmit(event) {
        event.preventDefault();

        setGeneratedData({
            caption: generatedCaption,
            hashtags: generatedHashtags,
            date: generatedDate,
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

                <div>
                    {generatedData !== null ? 
                    <h3>Generated Post will appear here</h3>
                    :
                    null
                    }
                </div>
            </div>
        </>
    );
};