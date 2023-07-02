import React from 'react';
import AddPostForm from '../Components/AddPostForm';
import '../styles/AddPostView.css'

function AddPostView() {
    const handleSubmit = (newPost) => {
        console.log(newPost);
    };

    return (
        <div className="container-addpostview">
            <h1>Añadir entrada</h1>
            <AddPostForm onSubmit={handleSubmit} />
        </div>
    );
}

export default AddPostView;
