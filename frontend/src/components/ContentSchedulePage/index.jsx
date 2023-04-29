import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getContent } from "../../../utils/backend"

import Card from '../Card/index.jsx'
import DetailsPage from '../DetailsPage/index.jsx'

export default function ContentSchedulePage({ postDisplay }) {

    // const [content, setContent] = useState([])
    // const [detailsPage, setDetailsPage] = useState([])

    // useEffect(() => {
    //     let randomVar = localStorage.getItem("isAuthenticated")
    //     console.log(randomVar)
    //     if (randomVar === "true") {
    //       console.log(localStorage.getItem('userToken'))
    //       getContent()
    //         .then(res => setContent(res))
    //     }
    //   }, [localStorage.getItem('userToken')])
    
    //   let postDisplay = <p>No posts to display</p>
      
    //   if (content.length > 0) {
    //     postDisplay = content
    //       .map((post, i) => <Card key={i} postInfo={post} updateDetailsPage={setDetailsPage}/> );
    // }


    function handleDelete() {
        console.log("delete posts from schedule page, coming soon...")
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Scheduled Content</h1>
            <div className="flex flex-col justify-center w-full"> 
                {postDisplay}
                <button 
                    onClick={handleDelete}
                    className="bg-slate-500 px-5 py-2 rounded text-white hover:bg-red-500"
                >
                    Delete Posts
                </button>
            </div>
        </div>

    )
}