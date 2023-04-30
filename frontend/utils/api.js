// mock ai api call for testing 



// export async function generateAi() {
//     console.log('ai loading.....')

//     const APIBody = {
//         "model": "text-davinci-003",
//         "prompt": `Generate a caption for an instagram post about an image with the following description: ${createFormData.description}`,
//         "temperature": 0,
//         "max_tokens": 100,
//         "top_p": 1.0,
//         "frequency_penalty": 0.5,
//         "presence_penalty": 0.0
//     }

//     await fetch("https://api.openai.com/v1/completions", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${API_KEY_DISP}`
//         },
//         body: JSON.stringify(APIBody)
//     }).then((data) =>  {
//         return data.json()
//     })
// }



// "Generate a caption for an Instagram post promoting our brand, using the following details:\n\nTitle: [post title]\nCaption keywords: [comma-separated list of keywords]\nCall to action: [call to action]\nVisual style: [visual style]\nHashtags: [comma-separated list of hashtags]\nPost time: [post time]\n\nOur brand is [branding keywords] and our mission is [mission statement]. Our competitive advantage is [competitive advantage] and our value proposition is [value proposition]. We are targeting [target audience] in the [industry] industry."


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

// ----------------------------------------------------------------------------------------------

// async function generateAi(event) {
//     event.preventDefault();
//     setLoading(true);
  
//     const { businessName, goals, industry, brandingKeywords } = userData;
  
//     const prompt = `Generate a caption with hashtags for an Instagram post about ${goals} for ${businessName} in the ${industry} industry. Use the following keywords: ${brandingKeywords}. Make sure the caption is catchy, informative, and optimized for maximum engagement.`;
  
//     const APIBody = {
//       model: "text-davinci-002",
//       prompt: prompt,
//       temperature: 0.5,
//       max_tokens: 200,
//       top_p: 1.0,
//       frequency_penalty: 0.5,
//       presence_penalty: 0.0
//     };
  
//     await fetch("https://api.openai.com/v1/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${API_KEY_DISP}`,
//       },
//       body: JSON.stringify(APIBody),
//     })
//       .then((data) => {
//         return data.json();
//       })
//       .then((data) => {
//         const aiResponse = data.choices[0].text.trim();
//         console.log(aiResponse);
//         setGeneratedData({
//           image: createFormData.image,
//           description: createFormData.description,
//           caption: aiResponse,
//         });
//       })
//       .finally(() => setLoading(false));
//   }
  