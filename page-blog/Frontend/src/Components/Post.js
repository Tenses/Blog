import React from 'react';
import { Link } from 'react-router-dom';

function Post({ post, onDelete }) {
    const handleDelete = () => {
        onDelete(post.id);
        alert('El post se ha borrado.');
    };

    const formatDateTime = (dateTimeString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', hour12: true };
        const dateTime = new Date(dateTimeString);
        return dateTime.toLocaleString('es-ES', options);
    };

    return (
        <article key={post.id}>
            <Link to={`/posts/${post.id}`}>
                <h2>{post.post_title}</h2>
                <img src={post.image_url} alt="Imagen de entrada" />
            </Link>
            <p>{post.post_content.substring(0, 50)}</p>
            <p>Fecha de última actualización: {formatDateTime(post.date)}</p>
            <button onClick={handleDelete}>Borrar</button>
        </article>
    );
}

export default Post;