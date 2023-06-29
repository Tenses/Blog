import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
                navigate('/'); // Redireccionar a HomeView
            } else {
                console.error('Error al crear la publicación:', data.error);
            }
        } catch (error) {
            console.error('Error al comunicarse con el servidor:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            {errorMessage && <p>{errorMessage}</p>}
            <div>
                <label>Título del post:</label>
                <input type="text" value={postTitle} onChange={handlePostTitleChange} />
            </div>
            <div>
                <label>Contenido del post:</label>
                <textarea value={postContent} onChange={handlePostContentChange} />
            </div>
            <div>
                <label>Imagen:</label>
                <input type="file" accept="image/*" onChange={handleImageFileChange} />
            </div>
            <button type="submit">Crear Post</button>
        </form>
    );
}

export default AddPostForm;
