import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getContent } from "../../../utils/backend"

import Card from '../Card/index.jsx'
import DetailsPage from '../DetailsPage/index.jsx'

export default function ContentSchedulePage({ postDisplay }) {

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