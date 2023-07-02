import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AddPostForm.css';

function AddPostForm() {
    const navigate = useNavigate();

    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handlePostTitleChange = (event) => {
        setPostTitle(event.target.value);
    };

    const handlePostContentChange = (event) => {
        setPostContent(event.target.value);
    };

    const handleImageFileChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!postTitle || !postContent || !imageFile) {
            setErrorMessage('Por favor, completa todos los campos');
            return;
        }

        setErrorMessage('');

        try {
            const formData = new FormData();
            formData.append('post_title', postTitle);
            formData.append('post_content', postContent);
            formData.append('image', imageFile);

            const response = await fetch('http://localhost:3000/posts', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Nueva publicación creada:', data.post_id);
                setPostTitle('');
                setPostContent('');
                setImageFile(null);
                navigate('/');
            } else {
                console.error('Error al crear la publicación:', data.error);
            }
        } catch (error) {
            console.error('Error al comunicarse con el servidor:', error);
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit} encType="multipart/form-data">
            {errorMessage && <p>{errorMessage}</p>}
            <div className="mb-3">
                <label htmlFor="postTitle" className="form-label">Título del post:</label>
                <input
                    type="text"
                    className="form-control"
                    id="postTitle"
                    value={postTitle}
                    onChange={handlePostTitleChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="postContent" className="form-label">Contenido del post:</label>
                <textarea
                    className="form-control"
                    id="postContent"
                    value={postContent}
                    onChange={handlePostContentChange}
                    rows={5}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="imageFile" className="form-label">Imagen:</label>
                <input
                    type="file"
                    className="form-control"
                    id="imageFile"
                    accept="image/*"
                    onChange={handleImageFileChange}
                />
            </div>
            <button type="submit" className="btn btn-primary submit-button">Crear Post</button>
        </form>
    );
}

export default AddPostForm;