import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Post.css';

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

    const truncateContent = (content, maxLength) => {
        if (content.length <= maxLength) {
            return content;
        }
        return content.substring(0, maxLength) + '...';
    };

    return (
        <div className="post-container">
            <Link to={`/posts/${post.id}`} className="post-link">
                <img className="post-image" src={post.image_url} alt="Imagen de entrada" />
            </Link>
            <Link to={`/posts/${post.id}`} className="post-link">
                <h2 className="post-title">{post.post_title}</h2>
            </Link>
            <p className="post-content">{truncateContent(post.post_content, 50)}</p>
            <p className="post-date">Fecha de última actualización: {formatDateTime(post.date)}</p>
            <button className="post-delete-btn" onClick={handleDelete}>Borrar</button>
        </div>
    );
}

export default Post;