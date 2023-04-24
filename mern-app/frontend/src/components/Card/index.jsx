import { Link } from 'react-router-dom';

export default function Card() {
    return (
        <>
            <Link to="/content-schedule-page">
                <img src={post.image} className="max-h-80"/>
                <p>{post.caption}</p>
            </Link>
        </>
    )
}