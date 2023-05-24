export default function HomePage() {
    return (
        <>
            <div className="bg-slate-100 rounded-xl shadow-xl p-5 mt-5 m-3">
                <h1 className="text-2xl font-bold mb-6">Welcome to Socai </h1>
                <p>Introducing Socai – the revolutionary app that takes the hassle out of creating engaging social media content. Say goodbye to endless hours spent brainstorming captions and scheduling posts – with Socai, all you need is an image! Our cutting-edge AI technology generates personalized captions tailored to your unique brand voice and audience, and even schedules your posts for optimal engagement.</p>
                <br />
                <p>Whether you're a small business owner, influencer, or social media enthusiast, Socai is the ultimate tool for streamlining your content creation process. With Socai, you can focus on what you do best – creating stunning visuals – and let us handle the rest. Try Socai today and watch your social media presence soar!</p>
                <br />
            </div>
            <div className="w-3/4">
                <div className="mt-8 mx-4">
                    <p className="italic">Sample Post:</p>
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-1 transition-all duration-300 my-5">
                        <img src='https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' className="w-full h-64 object-cover" />
                        <p className="text-gray-700 text-base p-5"><strong>@sample-account </strong> Looking for a new hiking challenge? Our backcountry guides can take you on an adventure you'll never forget! From crossing rivers to scaling mountains, we'll help you push your limits and experience the beauty of nature like never before.</p>
                        <p className="px-5 pb-3 font-bold">5/8/2023</p>
                    </div>
                </div>
            </div>
        </>
    )
}