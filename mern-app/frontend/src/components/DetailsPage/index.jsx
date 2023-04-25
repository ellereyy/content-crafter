import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getContent } from '../../../utils/backend.js';
import { deleteContent } from "../../../utils/backend"

export default function DetailsPage({ updateDetailsPage, postInfo }) {
    // const [showEditForm, setShowEditForm] = useState(false)
    // const [editFormData, setEditFormData] = useState({
    //     image: data.name,
    //     content: data.content,
    //     description: data.description,
    //     caption: data.caption,
    //     hashtags: '',
    //     date: '',
    // })


    const { id } = useParams()

    useEffect(() => {
        if (!postInfo) {
            getContent(`/api/posts/${id}`)
                .then(res => updateDetailsPage(res.data))
        }
    }, [])

    // function handleInputChange(event) {
    //     setEditFormData({
    //         ...editFormData,
    //         [event.target.name]: event.target.value
    //     })
    // }

    // function handleSubmit(event) {
    //     // prevent the page from reloading
    //     event.preventDefault()
    //     // close the form
    //     setShowEditForm(false)
    //     // update the comment in the backend
    //     updateComment(editFormData, data._id)
    //         .then(() => refreshComments())
    // }

    function handleDelete() {
        deleteContent(postInfo._id)
    }

    return (
        <>
            <h1>Post Details</h1>
            <div className="bg-emerald-300 p-5 m-5">
                <img src={postInfo.image} />
                <p>{postInfo.caption}</p>
                <div className="flex justify-between p-5">
                    
                    <button className="bg-slate-500 px-5 py-2 rounded text-white">Edit</button>

                    <button className="bg-slate-500 px-5 py-2 rounded text-white" onClick={handleDelete}>Delete</button>

                </div>
            </div>
            <div>
                <button className="bg-slate-500 px-5 py-2 rounded text-white">View All</button>
            </div>

            <div>
                
            </div>
        </>
    )
}


