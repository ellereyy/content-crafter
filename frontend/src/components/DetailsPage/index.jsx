import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { getContent, deleteContent, updateContent, getPost } from "../../../utils/backend"

export default function DetailsPage({ updatePosts, postInfo, user }) {

    const navigate = useNavigate()

    const [showEditForm, setShowEditForm] = useState(false)
    const [editDetails, setEditDetails] = useState({
        image: postInfo.image,
        caption: postInfo.caption
    })
 
    let { id } = useParams()
    // console.log(id)
    useEffect(() => {
        if (!postInfo.caption) {
            console.log('🚫 post info is empty')
            // getContent()
            //     .then(res => {
            //         updatePosts(res.id)
            //         console.log('🚫', res)
            //     })
        }
    }, [])

    function handleDelete() {
        deleteContent(postInfo._id)
            .then(() => navigate('/content'))
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
    const date = new Date(postInfo.date);
    const formattedDate = `Post at: ${date.toLocaleDateString()} | ${date.toLocaleTimeString()}`;

    
    return (
        <>
            <h1 className="text-2xl font-bold mb-6">Post Details</h1>
            <div className="bg-slate-100 rounded-xl shadow-xl p-5 m-3">
            
                <img src={postInfo.image} className="rounded-xl object-cover h-96 w-full"/>

            {showEditForm === false ?
                <div className="flex flex-col">
                    <p className="py-5 text-lg"> <strong>@{user.handle}</strong> {postInfo.caption}</p>
                    <p>{formattedDate}</p>
                    <div className="flex justify-between p-5">
                        <button 
                            onClick={() => { setShowEditForm(true) }}
                            className="bg-slate-500 px-5 py-2 rounded text-white hover:bg-slate-600"
                        >
                            Edit
                        </button>
                        <button className="bg-slate-500 px-5 py-2 rounded text-white hover:bg-red-500" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                </div>
            :
                <form onSubmit={handleEditSubmit} className="flex flex-col mt-2">
                    <input 
                        name="image"
                        value={editDetails.image}
                        onChange={handleEditChange}
                        className="my-3 p-2 rounded-lg"
                    />
                    <textarea 
                        name="caption"
                        value={editDetails.caption}
                        onChange={handleEditChange}
                        className="my-3 p-2 rounded-lg"
                        rows={5}
                    />
                    <input 
                        name="date"
                        value={editDetails.date}
                        onChange={handleEditChange}
                        className="my-3 p-2 rounded-lg"
                    />
                    <button type="submit" className="bg-slate-500 py-2 my-2 rounded text-white hover:bg-slate-600">
                        Submit
                    </button>
                </form>
            }
            </div>


            <div>
                <Link to="/content">
                    <button className="bg-slate-500 px-5 py-2 mt-6 rounded text-white hover:bg-slate-600">View All</button>
                </Link>
            </div>
        </>
    )
}


