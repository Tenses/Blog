import React from 'react';

function SinglePost({ post }) {
    return (
        <div>
            <img src={post.image} alt="Imagen de entrada" />
            <h1>{post.title}</h1>
            <p>{post.date}</p>
            <p>{post.content}</p>
        </div>
    );
}

export default SinglePost;
