import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getContent } from '../../../utils/backend';


export default function ContentSchedulePage() {
    const [content, setContent] = useState([])

    // useEffect
    useEffect(() => {
        getContent()
            .then(content => setContent(content))
    }, [])

    // functions

    // conditional rendering for posts
    let postDisplay = <p>No posts to display</p>;
    if (content.length > 0) {
        postDisplay = content.map(post => {
            return (
                <div key={post._id}>
                    <img src={post.image} className="max-h-80"/>
                    <p>{post.caption}</p>
                </div>
            )
        })
    }

    return (
        <>
            <h1>Scheduled Content</h1>   
            <div>
                {postDisplay}
            </div>         
        </>
    )
}