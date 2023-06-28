import React from 'react';
import { useParams } from 'react-router-dom';
import SinglePost from '../Components/SinglePost';

function SinglePostView() {
    const { id } = useParams();

    const post = {
        id,
        title: 'Título de la entrada',
        content: 'Contenido de la entrada',
        image: 'ruta/de/la/imagen.jpg',
        date: 'Fecha de publicación',
    };

    return (
        <div>
            <SinglePost post={post} />
        </div>
    );
}

export default SinglePostView;
