import openai from 'openai-api';


async function generateData() {   

    // const configuration = new Configuration({
        //     apiKey: import.meta.env.OPENAI_API_KEY,
        // });
        // const openai = new OpenAI({
        //     apiKey: import.meta.env.OPENAI_API_KEY,
        //   });

    openai.apiKey = import.meta.env.OPENAI_API_KEY;
    const prompt = `Generate caption, hashtags, and date for a social media post about an image with the following description: ${createFormData.description}`;

    const response = await openai.create({
        engine: 'text-davinci-002',
        prompt,
        temperature: 0.7,
        maxTokens: 100,
        n: 1,
        stop: '\n',
    });

    const [generatedCaption, generatedHashtags, generatedDate] = response.choices[0].text.split('\n');

    setGeneratedData({
        caption: generatedCaption,
        hashtags: generatedHashtags,
        date: generatedDate,
    });

    setCreateFormData({
        image: '',
        description: '',
    });

}