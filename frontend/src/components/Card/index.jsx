import { Link } from 'react-router-dom';
import DetailsPage from '../DetailsPage';

export default function Card({ postInfo, updateDetailsPage, user }) {

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-1 transition-all duration-300 m-10">
            <Link 
                to={"/content/" + postInfo._id}
                onClick={() => updateDetailsPage(postInfo)}
            >
                <img src={postInfo.image} className="w-full h-64 object-cover" />
                <p className="text-gray-700 text-base p-5"><strong>@{user.handle}</strong> {postInfo.caption}</p>
                <p className="px-5 pb-3 font-bold">{new Date(postInfo.date).toLocaleDateString()}</p>
            </Link>
        </div>
    )

}