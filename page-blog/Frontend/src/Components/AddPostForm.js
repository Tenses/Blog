import React, { useState } from 'react';

function AddPostForm() {
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [imageFileName, setImageFileName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handlePostTitleChange = (event) => {
        setPostTitle(event.target.value);
    };

    const handlePostContentChange = (event) => {
        setPostContent(event.target.value);
    };

    const handleImageFileChange = (event) => {
        const file = event.target.files[0];
        setImageFileName(file.name);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!postTitle || !postContent || !imageFileName) {
            setErrorMessage('Por favor, completa todos los campos');
            return;
        }

        setErrorMessage('');

        try {
            const response = await fetch('http://localhost:3000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    post_title: postTitle,
                    post_content: postContent,
                    image_url: imageFileName,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Nueva publicación creada:', data.post_id);
                setPostTitle('');
                setPostContent('');
                setImageFileName('');
            } else {
                console.error('Error al crear la publicación:', data.error);
            }
        } catch (error) {
            console.error('Error al comunicarse con el servidor:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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

