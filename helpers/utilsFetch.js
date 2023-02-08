export const cloudinaryFetch = async(value) => {
    const formDataImage = new FormData()
    formDataImage.append('file', value)
    formDataImage.append('upload_preset', 'hpiyjxfo')
    const res = await fetch(`https://api.cloudinary.com/v1_1/dnratk2kj/image/upload`, {
        method: 'POST',
        body: formDataImage
    })
    const data = await res.json()
    return data
}

export const fetchAPI = async (route) => {
    const res = await fetch(`http://localhost:3000/api/${route}`)
    const data = await res.json()
    return data
}
