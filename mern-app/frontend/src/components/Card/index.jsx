import { Link } from 'react-router-dom';

export default function Card({ postInfo, updateDetailsPage }) {
    return (
        <div className="w-80 h-96 bg-white rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-1 transition-all duration-300 m-10">
            <Link 
                to={"/content/" + postInfo._id}
                onClick={() => updateDetailsPage(postInfo)}
            >
                <img src={postInfo.image} className="w-full h-64 object-cover" />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{postInfo.title}</div>
                    <p className="text-gray-700 text-base">{postInfo.caption}</p>
                </div>
            </Link>
        </div>
    )
}
