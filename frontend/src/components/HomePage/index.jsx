import { Link } from 'react-router-dom';

export default function HomePage({ postDisplay }) {
    return (
        <>
            <div className="bg-slate-100 rounded-xl shadow-xl p-5 mt-5 m-3">
                <h1 className="text-2xl font-bold mb-6">Welcome to Socai </h1>
                <p>Introducing Socai – the revolutionary app that takes the hassle out of creating engaging social media content. Say goodbye to endless hours spent brainstorming captions and scheduling posts – with Socai, all you need is an image! Our cutting-edge AI technology generates personalized captions tailored to your unique brand voice and audience, and even schedules your posts for optimal engagement.</p>
                <br />
                <p>Whether you're a small business owner, influencer, or social media enthusiast, Socai is the ultimate tool for streamlining your content creation process. With Socai, you can focus on what you do best – creating stunning visuals – and let us handle the rest. Try Socai today and watch your social media presence soar!</p>
                <br />
            </div>
        </>
    )
}