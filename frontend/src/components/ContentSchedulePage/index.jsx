import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getContent } from "../../../utils/backend"

import Card from '../Card/index.jsx'
import DetailsPage from '../DetailsPage/index.jsx'

export default function ContentSchedulePage({ postDisplay }) {

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Scheduled Content</h1>
            <div className="flex flex-col justify-center w-full"> 
                {postDisplay}
            </div>
        </div>

    )
}