import React from 'react';
import { useParams } from 'react-router-dom';
import DeletePost from '../Components/DeletePost';

function DeletePostView() {
    const { id } = useParams();

    const handleDelete = () => {
        console.log(`Eliminar entrada con ID: ${id}`);
    };

    return (
        <div>
            <h1>Eliminar entrada</h1>
            <DeletePost onDelete={handleDelete} />
        </div>
    );
}

export default DeletePostView;
