import { useState } from 'react'

const usePreviewImage = () => {
    const [prevImage, setPrevImage] = useState(null)
    
    const handleChangePrevImage = (e) => {
        const readerImg = new FileReader()
        readerImg.readAsDataURL(e.currentTarget.files[0])
        readerImg.onloadend = () => {
            setPrevImage(readerImg.result)
        }
    }
    return {
        prevImage, setPrevImage, handleChangePrevImage
    }
}

export default usePreviewImage