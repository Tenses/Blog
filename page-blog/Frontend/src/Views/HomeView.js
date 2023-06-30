import React, { useEffect, useState } from 'react';
import Post from '../Components/Post';
import { url } from '../Utils/url';

function HomeView() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = () => {
        fetch(`${url}posts`)
            .then((response) => response.json())
            .then((data) => {
                const reversedPosts = data.reverse();
                setPosts(reversedPosts);
            })
            .catch((error) => console.error(error));
    };

    const handleDelete = (postId) => {
        fetch(`${url}posts/${postId}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                fetchPosts();
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="container">
            <h1 className="text-center">Home</h1>
            <div className="row">
                {posts.map((post) => (
                    <div className="col-md-4" key={post.id}>
                        <Post post={post} onDelete={() => handleDelete(post.id)} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomeView;