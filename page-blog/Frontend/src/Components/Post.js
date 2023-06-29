import React from 'react';

function Post({ post, onDelete }) {
    const handleDelete = () => {
        onDelete(post.id);
    };

    return (
        <article key={post.id}>
            <h2>{post.post_title}</h2>
            <p>{post.post_content.substring(0, 50)}</p>
            <img src={post.image_url} alt="Imagen de entrada" />
            <button onClick={handleDelete}>Borrar</button>
        </article>
    );
}

export default Post;