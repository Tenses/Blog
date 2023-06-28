import React, { useState } from 'react';

function AddPostForm({ onSubmit }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            title,
            content,
            image,
        };
        onSubmit(newPost);
        setTitle('');
        setContent('');
        setImage('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Título:</label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <label htmlFor="content">Contenido:</label>
            <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            ></textarea>

            <label htmlFor="image">Imagen:</label>
            <input
                type="file"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
                required
            />

            <button type="submit">Guardar</button>
        </form>
    );
}

export default AddPostForm;
