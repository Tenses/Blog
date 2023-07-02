import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditPost from '../Components/EditPost';
import '../styles/SinglePostView.css';

function SinglePostView() {
    const { id: postId } = useParams();
    const [post, setPost] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [shouldFetchPost, setShouldFetchPost] = useState(false);
    const navigate = useNavigate();

    const fetchPost = useCallback(() => {
        fetch(`http://localhost:3000/posts/${postId}`)
            .then((response) => response.json())
            .then((data) => {
                setPost(data);
            })
            .catch((error) => console.error(error));
    }, [postId]);

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    useEffect(() => {
        if (shouldFetchPost) {
            fetchPost();
            setShouldFetchPost(false);
        }
    }, [shouldFetchPost, fetchPost]);

    const toggleEditMode = () => {
        setIsEditMode((prevEditMode) => !prevEditMode);
    };

    const handleDelete = () => {
        fetch(`http://localhost:3000/posts/${postId}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                navigate('/');
            })
            .catch((error) => console.error(error));
        alert('El post se ha borrado.');
    };

    const handleSave = (editedPost) => {
        console.log(editedPost);
        toggleEditMode();
        setShouldFetchPost(true);
    };

    if (!post) {
        return <div>Cargando...</div>;
    }

    const formatDateTime = (dateTimeString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', hour12: true };
        const dateTime = new Date(dateTimeString);
        return dateTime.toLocaleString('es-ES', options);
    };

    return (
        <div className="container">
            <div className="content-container">
                {isEditMode ? (
                    <EditPost post={post} onSave={handleSave} onCancel={toggleEditMode} />
                ) : (
                    <>
                        <div className="post-title-container">
                            <div className="explanatory-text">
                                <p>Título del post</p>
                            </div>
                            <h2 className="post-title text-center">{post.post_title}</h2>
                        </div>
                        <div className="image-container">
                            <div className="explanatory-text image-explanatory-text">
                                <p>Imagen del post</p>
                            </div>
                            <img src={post.image_url} alt="Post" className="centered-image img-fluid" />
                        </div>
                        <div className="post-content-container">
                            <div className="explanatory-text">
                                <p>Contenido del post</p>
                            </div>
                            <p className="post-content">{post.post_content}</p>
                        </div>
                        <p>Fecha de última actualización: {formatDateTime(post.date)}</p>
                        <div>
                            <button onClick={toggleEditMode}>Editar</button>
                            <button onClick={handleDelete}>Borrar</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default SinglePostView;
