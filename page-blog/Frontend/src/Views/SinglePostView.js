import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function SinglePostView() {
    const { id: postId } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    const fetchPost = useCallback(() => {
        fetch(`http://localhost:3000/posts/${postId}`)
            .then((response) => response.json())
            .then((data) => setPost(data))
            .catch((error) => console.error(error));
    }, [postId]);

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    const handleDelete = () => {
        fetch(`http://localhost:3000/posts/${postId}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // Redireccionar al HomeView
                navigate('/');
            })
            .catch((error) => console.error(error));
    };

    if (!post) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h2>{post.post_title}</h2>
            <img src={post.image_url} alt="Post" />
            <p>{post.post_content}</p>
            <p>{post.date}</p>
            <button onClick={handleDelete}>Borrar</button>
        </div>
    );
}

export default SinglePostView;


