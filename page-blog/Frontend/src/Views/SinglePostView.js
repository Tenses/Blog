import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function SinglePostView() {
    const { id: postId } = useParams();
    const [post, setPost] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedPost, setEditedPost] = useState({
        post_title: '',
        post_content: '',
        image: null,
    });
    const [shouldFetchPost, setShouldFetchPost] = useState(false);
    const navigate = useNavigate();

    const fetchPost = useCallback(() => {
        fetch(`http://localhost:3000/posts/${postId}`)
            .then((response) => response.json())
            .then((data) => {
                setPost(data);
                setEditedPost(data); // Establecer los valores editados como los valores iniciales
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

    const handleEditChange = (event) => {
        const { name, value } = event.target;
        setEditedPost((prevEditedPost) => ({
            ...prevEditedPost,
            [name]: value,
        }));
    };

    const handleImageFileChange = (event) => {
        const file = event.target.files[0];
        setEditedPost((prevEditedPost) => ({
            ...prevEditedPost,
            image: file,
        }));
    };

    const handleSave = () => {
        // Validar si se ha adjuntado una nueva imagen
        if (!editedPost.image) {
            alert("adjunta una nueva imagen");
            console.error('Debes adjuntar una imagen');
            return;
        }

        const formData = new FormData();
        formData.append('post_title', editedPost.post_title);
        formData.append('post_content', editedPost.post_content);
        formData.append('image', editedPost.image);

        fetch(`http://localhost:3000/posts/${postId}`, {
            method: 'PUT',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                toggleEditMode(); // Salir del modo de edición después de guardar los cambios
                setShouldFetchPost(true);
            })
            .catch((error) => console.error(error));
    };


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
            {isEditMode ? (
                <>
                    <input
                        type="text"
                        name="post_title"
                        value={editedPost.post_title}
                        onChange={handleEditChange}
                    />
                    <input
                        type="text"
                        name="post_content"
                        value={editedPost.post_content}
                        onChange={handleEditChange}
                    />
                    <input type="file" accept="image/*" onChange={handleImageFileChange} />
                    <button onClick={handleSave}>Guardar cambios</button>
                </>
            ) : (
                <>
                    <h2>{post.post_title}</h2>
                    <img src={post.image_url} alt="Post" />
                    <p>{post.post_content}</p>
                    <p>{post.date}</p>
                    <button onClick={toggleEditMode}>Editar</button>
                    <button onClick={handleDelete}>Borrar</button>
                </>
            )}
        </div>
    );
}

export default SinglePostView;
