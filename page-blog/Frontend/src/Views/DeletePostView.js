import React from 'react';
import { useParams } from 'react-router-dom';

function DeletePostView() {
    const { id } = useParams();

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/posts/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Publicación eliminada');
                window.location.href = '/';
            } else {
                console.error('Error al eliminar la publicación');
            }
        } catch (error) {
            console.error('Error al comunicarse con el servidor:', error);
        }
    };

    return (
        <div>
            <h1>Eliminar entrada</h1>
            <button onClick={handleDelete}>Eliminar</button>
        </div>
    );
}

export default DeletePostView;
