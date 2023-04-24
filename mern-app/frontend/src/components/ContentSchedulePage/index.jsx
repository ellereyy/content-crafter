import { useState, useEffect } from 'react';
import { getContent } from '../../../utils/backend';


export default function ContentSchedulePage() {
    const [contentDisplay, setContentDisplay] = useState([])

    // useEffect
    useEffect(() => {
        getContent()
            .then(content => setContentDisplay(content))
    }, [])




    return (
        <>
            <h1>Scheduled Content</h1>            
        </>
    )
}