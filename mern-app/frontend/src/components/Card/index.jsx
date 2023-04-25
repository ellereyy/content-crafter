import { Link } from 'react-router-dom';

export default function Card({ postInfo, updateDetailsPage }) {
    // console.log(postInfo)
    return (
        <Link 
            to={"/content/" + postInfo._id}
            onClick={() => updateDetailsPage(postInfo)}
        >
            <div className="bg-emerald-300 m-5 flex flex-col">
            
                <img src={postInfo.image}/>
                <p>{postInfo.caption}</p>

            </div>
        </Link>

    )
}