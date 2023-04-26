import { getContent } from "../../../utils/backend"

export default function ContentSchedulePage({ postDisplay  }) {

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Scheduled Content</h1>
            <div className="flex flex-col justify-center w-full"> 
                {postDisplay}
            </div>
        </div>
    )
}