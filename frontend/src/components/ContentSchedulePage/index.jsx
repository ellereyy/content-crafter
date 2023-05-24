export default function ContentSchedulePage({ postDisplay }) {

    return (
        <div className='mt-3'>
            <h1 className="text-2xl font-bold mb-6">Scheduled Content</h1>
            <div className="grid grid-cols-2 justify-center m-auto"> 
                {postDisplay}
            </div>
        </div>
    )

}