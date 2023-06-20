import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
// import moment from 'moment';

import { getContent, deleteContent, updateContent, getPost } from "../../../utils/backend"

export default function DetailsPage({ updatePosts, postInfo, user }) {

    const navigate = useNavigate()
    const [showEditForm, setShowEditForm] = useState(false)
    const [editDetails, setEditDetails] = useState({
        image: postInfo.image,
        caption: postInfo.caption,
        date: postInfo.date
    })

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
    const formattedDate = date.toLocaleDateString();
    // const momentDate = moment(postInfo.date).format('YYYY-MM-DD')

    // console.log('date props:' + postInfo.date)
    // console.log('date var:' + date)
    console.log('formatted date:' + formattedDate)

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
                    <label className="font-bold mb-1 text-gray-800">Image URL:</label>
                    <input 
                        name="image"
                        value={editDetails.image}
                        onChange={handleEditChange}
                        className="my-3 p-2 border rounded-lg"
                    />
                    <label className="font-bold mb-1 text-gray-800">Caption:</label>
                    <textarea 
                        name="caption"
                        value={editDetails.caption}
                        onChange={handleEditChange}
                        className="my-3 p-2 border rounded-lg"
                        rows={5}
                    />
                    <label className="font-bold mb-1 text-gray-800">Date:</label>
                    <input 
                        name="date"
                        type="date"
                        value={formattedDate}
                        onChange={handleEditChange}
                        className="my-3 p-2 border rounded-lg"
                    />
                    <label className="font-bold mb-1 text-gray-800">Test:</label>
                    <input 
                        name="test"
                        type="date"
                        value={formattedDate}
                        onChange={handleEditChange}
                        className="my-3 p-2 border rounded-lg"
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