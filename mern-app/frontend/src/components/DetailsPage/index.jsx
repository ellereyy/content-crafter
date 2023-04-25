import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { getContent, deleteContent, updateContent } from "../../../utils/backend"

export default function DetailsPage({ updatePosts, postInfo }) {

    const navigate = useNavigate()

    const [showEditForm, setShowEditForm] = useState(false)
    const [editDetails, setEditDetails] = useState({
        image: postInfo.image,
        caption: postInfo.caption
    })

    const { id } = useParams()

    useEffect(() => {
        if (!postInfo) {
            getContent(`/api/posts/${id}`)
                .then(res => updatePosts(res.data))
        }
    }, [])

    function handleDelete() {
        deleteContent(postInfo._id)
            .then(() => navigate('/'))
    }

    function handleEditChange(event) {
        setEditDetails({
            ...editDetails,
            [event.target.name]: event.target.value
        });
    }

    function handleEditSubmit(event) {
        event.preventDefault()
        setShowEditForm(false)
        updateContent(editDetails, postInfo._id)
            .then(() => updatePosts(editDetails))
    }
    
    return (
        <>
            <h1>Post Details</h1>
            <div className="bg-emerald-300 p-5 m-5">
            
                <img src={postInfo.image} />

            {showEditForm === false ?
                <div className="flex flex-col">
                    <p>{postInfo.caption}</p>
                    <div className="flex justify-between p-5">
                        <button 
                            onClick={() => { setShowEditForm(true) }}
                            className="bg-slate-500 px-5 py-2 rounded text-white"
                        >
                            Edit
                        </button>
                        <button className="bg-slate-500 px-5 py-2 rounded text-white" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                </div>

                :

                <form onSubmit={handleEditSubmit} className="flex flex-col">
                    <input 
                        name="image"
                        value={editDetails.image}
                        onChange={handleEditChange}
                        className="my-3"
                    />
                    <textarea 
                        name="caption"
                        value={editDetails.caption}
                        onChange={handleEditChange}
                        className="my-3"
                    />
                    <button type="submit" className="bg-slate-500 px-5 py-2 rounded text-white">
                        Submit
                    </button>
                </form>
                }
            </div>


            <div>
                <Link to="/">
                    <button className="bg-slate-500 px-5 py-2 rounded text-white">View All</button>
                </Link>
            </div>
        </>
    )
}