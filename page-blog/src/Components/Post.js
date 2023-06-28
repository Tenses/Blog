import React from 'react';

function Post({ post }) {
    return (
        <article key={post.id}>
            <h2>{post.post_title}</h2>
            <p>{post.post_content.substring(0, 50)}</p>
            <img src={post.image_url} alt="Imagen de entrada" />
            <button>Borrar</button>
        </article>
    );
}

export default Post;
