import React from 'react';
import AddPostForm from '../Components/AddPostForm';

function AddPostView() {
    const handleSubmit = (newPost) => {
        console.log(newPost);
    };

    return (
        <div>
            <h1>Añadir entrada</h1>
            <AddPostForm onSubmit={handleSubmit} />
        </div>
    );
}

export default AddPostView;
