import React, { useState } from 'react';

function AddPostForm({ onSubmit }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('post_title', title);
        formData.append('post_content', content);
        formData.append('image', image);

        fetch('http://localhost:3000/posts', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                // Aquí puedes realizar alguna acción después de crear la publicación,
                // como redirigir a la página del nuevo post o actualizar la lista de posts.
                console.log(data); // Datos de la respuesta del servidor
                onSubmit(); // Llamar a la función de éxito o limpiar el formulario
            })
            .catch((error) => console.error(error));

        setTitle('');
        setContent('');
        setImage(null);
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

