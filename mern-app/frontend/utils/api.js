import openai from 'openai';

    // async function handleSubmit(event) {
    //     event.preventDefault();
    //     // const { caption, hashtags, date } = await generatePostContent(createFormData);
    //     setCreateFormData({
    //       image: "",
    //       description: "",
    //     //   caption,
    //     //   hashtags,
    //     //   date,
    //     });
    //     // await postContent({ ...createFormData, caption, hashtags, date });
    // }

async function generatePostContent({ description }) {
    openai.apiKey = import.meta.env.VITE_OPENAIAPI_KEY;
    const prompt = `Generate caption, hashtags, and date for an Instagram post using the description below:\nDescription: ${description}\n\nCaption:`;
    const { data } = await openai.completions.create({
        engine: "text-davinci-002",
        prompt,
        max_tokens: 64,
        n: 1,
        stop: ["Hashtags:", "Date:"],
        temperature: 0.5,
    });
    const output = data.choices[0].text.trim();
    const [caption, hashtags, date] = output.split("\n");
    return { caption, hashtags, date };
}

export default generatePostContent;