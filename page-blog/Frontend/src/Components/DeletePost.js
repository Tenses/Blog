import React from 'react';

function DeletePost({ onDelete }) {
    const handleDelete = () => {
        onDelete();
    };

    return (
        <div>
            <p>¿Estás seguro de que quieres eliminar esta entrada?</p>
            <button onClick={handleDelete}>Borrar</button>
        </div>
    );
}

export default DeletePost;
