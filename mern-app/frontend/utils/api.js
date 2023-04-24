

export async function generateAi() {
    console.log('ai loading.....')

    const APIBody = {
        "model": "text-davinci-003",
        "prompt": `Generate a caption for an instagram post about an image with the following description: ${createFormData.description}`,
        "temperature": 0,
        "max_tokens": 100,
        "top_p": 1.0,
        "frequency_penalty": 0.5,
        "presence_penalty": 0.0
    }

    await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY_DISP}`
        },
        body: JSON.stringify(APIBody)
    }).then((data) =>  {
        return data.json()
    }).then((data) => {
        console.log(data)
        setGeneratedData(data.choices[0].text.trim())
    })
}











// async function generateData() {   

//     // const configuration = new Configuration({
//         //     apiKey: import.meta.env.OPENAI_API_KEY,
//         // });
//         // const openai = new OpenAI({
//         //     apiKey: import.meta.env.OPENAI_API_KEY,
//         //   });

//     openai.apiKey = import.meta.env.OPENAI_API_KEY;
//     const prompt = `Generate caption, hashtags, and date for a social media post about an image with the following description: ${createFormData.description}`;

//     const response = await openai.create({
//         engine: 'text-davinci-002',
//         prompt,
//         temperature: 0.7,
//         maxTokens: 100,
//         n: 1,
//         stop: '\n',
//     });

//     const [generatedCaption, generatedHashtags, generatedDate] = response.choices[0].text.split('\n');

//     setGeneratedData({
//         caption: generatedCaption,
//         hashtags: generatedHashtags,
//         date: generatedDate,
//     });

//     setCreateFormData({
//         image: '',
//         description: '',
//     });

// }