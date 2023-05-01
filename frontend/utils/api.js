// mock ai api call for testing 
// async function fakeGenerate(event) {
//     event.preventDefault()
//     setLoading(true)
//     console.log('calling fake ai api....')

//     await new Promise(resolve => setTimeout(resolve, 1000))

//     setGeneratedData({
//         image: createFormData.image,
//         description: createFormData.description,
//         caption: 'instagram caption goes here!! #ad',
//     })

//     setLoading(false)
// }