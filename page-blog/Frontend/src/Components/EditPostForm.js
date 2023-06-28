import React, { useState } from 'react';

function EditPostForm({ post, onSubmit }) {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [image, setImage] = useState(post.image);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedPost = {
            id: post.id,
            title,
            content,
            image,
        };
        onSubmit(updatedPost);
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
            />

            <button type="submit">Guardar</button>
        </form>
    );
}

export default EditPostForm;
