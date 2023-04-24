import { useState, useEffect } from "react"
import { getContent, postContent } from "../../../utils/backend"
import openai from 'openai';

export default function GeneratePage() {

    // state
    const [content, setContent] = useState([])
    const [createFormData, setCreateFormData] = useState({
        image: '',
        description: '',
        caption: '',
        hashtags: '',
        date: '',
    })

    useEffect
    useEffect(() => {
        getContent()
            .then(content => setContent(content))
    }, [])

    // functions
    function handleInputChange(event) {
        setCreateFormData({
            ...createFormData,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        setCreateFormData({
            image: '',
            description: ''
        })
        postContent({...createFormData})
    }

    // async function handleSubmit(event) {
    //     event.preventDefault();
    //     // const { caption, hashtags, date } = await generatePostContent(createFormData);
    //     setCreateFormData({
    //       image: "",
    //       description: "",
    //     //   caption,
    //     //   hashtags,
    //     //   date,
    //     });
    //     // await postContent({ ...createFormData, caption, hashtags, date });
    // }


    // conditional rendering for posts
    let postDisplay = <p>No posts to display</p>;
    if (content.length > 0) {
        postDisplay = content.map(post => {
            return (
                <div key={post._id}>
                    <img src={post.image} />
                    <p>{post.description}</p>
                    <p>{post.caption}</p>
                    <p>{post.hashtags}</p>
                    <p>{post.date}</p>
                </div>
            )
        })
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
                <br />
                <div>
                    {postDisplay}
                </div>
            </div>
        </>
    )
};

