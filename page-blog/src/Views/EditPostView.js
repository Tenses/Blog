import React from 'react';
import { useParams } from 'react-router-dom';
import EditPostForm from '../Components/EditPostForm';

function EditPostView() {
    const { id } = useParams();

    const post = {
        id,
        title: 'Título de la entrada',
        content: 'Contenido de la entrada',
        image: 'ruta/de/la/imagen.jpg',
        date: 'Fecha de publicación',
    };

    const handleSubmit = (updatedPost) => {
        console.log(updatedPost);
    };

    return (
        <div>
            <h1>Editar entrada</h1>
            <EditPostForm post={post} onSubmit={handleSubmit} />
        </div>
    );
}

export default EditPostView;
