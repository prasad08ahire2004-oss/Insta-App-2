import React, { useEffect, useState } from 'react'
import '../styles/CreatePost.scss'
import { useNavigate } from 'react-router-dom'

import { createPost } from '../services/post.api'
// hum ne createPost function jo post.api.js mai bana tha vo import kiya hai ye function hum se image aur caption ki values leke backend ko dega aur response receive karega

const CreatePost = () => {

    const navigate = useNavigate()

    // Selected image file
    const [selectedFile, setSelectedFile] = useState(null)

    // Image preview URL
    const [previewUrl, setPreviewUrl] = useState('')

    // Caption
    const [caption, setCaption] = useState('')

    // Success message
    const [message, setMessage] = useState('')

    //loading batayegi ki API request chal rahi hai ya nahi.
    const [loading, setLoading] = useState(false)


    // Create preview URL when an image is selected
    useEffect(() => {

        if (!selectedFile) {
            setPreviewUrl('')
            return
        }

        const imageUrl = URL.createObjectURL(selectedFile)

        setPreviewUrl(imageUrl)

        // Remove the temporary URL when it is no longer needed
        return () => {
            URL.revokeObjectURL(imageUrl)
        }

    }, [selectedFile])


    // Select an image
    const handleImageChange = (event) => {

        const file = event.target.files[0]

        if (!file) return

        if (!file.type.startsWith('image/')) {
            event.target.value = ''
            return
        }

        setSelectedFile(file)

    }


    // Remove selected image
    const handleRemoveImage = () => {

        setSelectedFile(null)

    }


    // Handle form submission
    const handlePost = async (event) => {

        event.preventDefault()

        // Image select nahi hai ya request already chal rahi hai
        if (!selectedFile || loading) return

        // Upload start
        setLoading(true)

        try {
            // Loading start hone ka message
            setMessage('Uploading your post...')

            // Image aur caption backend API ko bhejna
            const response = await createPost(selectedFile, caption)

            // Backend se success response milne par message dikhana
            setMessage(response.message || 'Post created successfully!')

            // Form reset karna
            setSelectedFile(null)
            setCaption('')
            event.target.reset()

            // Feed page par navigate karna
            navigate('/feed')

            // 2.5 seconds baad message remove karna
            setTimeout(() => {
                setMessage('')
            }, 2500)

        } catch (error) {
            // API fail hone par error message dikhana
            setMessage(error.message || 'Failed to create post.')
        } finally {
            // Success ho ya error, loading band karna
            setLoading(false)
        }

    }


    return (

        <form className="screen" onSubmit={handlePost}>

            {/* Header */}
            <header className="header">

                <button
                    className="icon-btn"
                    type="button"
                    aria-label="Close"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        aria-hidden="true"
                    >
                        <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                </button>

                <h1 className="header__title">
                    New post
                </h1>

                <span className="header__spacer"></span>

            </header>


            {/* Main Content */}
            <div className="content">

                {/* Image Section */}
                <section className="section">

                    <h2 className="section__title">
                        Image
                    </h2>


                    {/* Show when no image is selected */}
                    {!selectedFile && (

                        <div className="dropzone">

                            <span className="dropzone__icon">

                                <svg
                                    width="30"
                                    height="30"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M12 16V5" />
                                    <path d="M7 9l5-5 5 5" />
                                    <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
                                </svg>

                            </span>

                            <span className="dropzone__title">
                                Select an image
                            </span>

                            <span className="dropzone__hint">
                                Choose a photo from your computer or downloads.
                                JPG, PNG, GIF or WebP.
                            </span>

                            <span className="dropzone__button">
                                Browse files
                            </span>

                            <input
                                className="file-input"
                                type="file"
                                name="image"
                                accept="image/*"
                                aria-label="Select an image from your computer"
                                onChange={handleImageChange}
                            />

                        </div>

                    )}


                    {/* Show after selecting an image */}
                    {selectedFile && (

                        <div className="preview">

                            <img
                                className="preview__img"
                                src={previewUrl}
                                alt="Selected image preview"
                            />

                            {/* Remove Image Button */}
                            <button
                                className="icon-btn preview__remove"
                                type="button"
                                aria-label="Remove image"
                                onClick={handleRemoveImage}
                            >

                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                    aria-hidden="true"
                                >
                                    <path d="M6 6l12 12M18 6L6 18" />
                                </svg>

                            </button>


                            {/* Change Image Button */}
                            <label className="preview__change">

                                Change image

                                <input
                                    className="file-input"
                                    type="file"
                                    accept="image/*"
                                    aria-label="Choose a different image"
                                    onChange={handleImageChange}
                                />

                            </label>

                        </div>

                    )}


                    {/* Selected File Name */}
                    {selectedFile && (

                        <p className="file-name">
                            {selectedFile.name}
                        </p>

                    )}

                </section>


                {/* Caption Section */}
                <section className="section">

                    <label
                        className="section__title"
                        htmlFor="caption"
                    >
                        Caption
                    </label>

                    <div className="caption">

                        <textarea
                            className="caption__input"
                            id="caption"
                            name="caption"
                            rows="3"
                            maxLength={280}
                            placeholder="Write a caption..."
                            value={caption}
                            onChange={(event) => {
                                setCaption(event.target.value)
                            }}
                        />

                        <span className="caption__count">
                            {caption.length} / 280
                        </span>

                    </div>

                </section>

            </div>


            {/* Footer */}
            <div className="footer">

                <button
                    className="post-btn"
                    type="submit"
                    disabled={!selectedFile || loading}
                >
                    {loading ? 'Posting...' : 'Post'}
                </button>

            </div>


            {/* Success Message */}
            {message && (

                <div className="toast" role="status">
                    {message}
                </div>

            )}

        </form>

    )
}

export default CreatePost