import React, { useState } from 'react';

function EditPost({ post, onSave, onCancel }) {
    const [editedPost, setEditedPost] = useState({
        post_title: post.post_title,
        post_content: post.post_content,
        image: null,
    });

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

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('post_title', editedPost.post_title);
        formData.append('post_content', editedPost.post_content);
        formData.append('image', editedPost.image);

        try {
            const response = await fetch(`http://localhost:3000/posts/${post.id}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                onSave();
            } else {
                console.error('Error al guardar los cambios');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="post-title-container">
                <div className="explanatory-text">
                    <p>Título del post</p>
                </div>
                <input
                    type="text"
                    name="post_title"
                    value={editedPost.post_title}
                    onChange={handleEditChange}
                />
            </div>
            <div className="image-container">
                <div className="explanatory-text image-explanatory-text">
                    <p>Imagen del post</p>
                </div>
                <img src={post.image_url} alt="Post" className="centered-image img-fluid" />
                <div className="image-upload">
                    <input type="file" accept="image/*" onChange={handleImageFileChange} />
                    <button className="btn btn-secondary">Adjuntar imagen</button>
                </div>
            </div>
            <div className="post-content-container">
                <div className="explanatory-text">
                    <p>Contenido del post</p>
                </div>
                <textarea
                    name="post_content"
                    value={editedPost.post_content}
                    onChange={handleEditChange}
                    resize="both"
                />
            </div>
            <button className="btn btn-primary" onClick={handleSave}>
                Guardar cambios
            </button>
            <button onClick={onCancel}>Cancelar</button>
        </>
    );
}

export default EditPost;