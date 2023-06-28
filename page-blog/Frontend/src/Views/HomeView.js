import React, { useEffect, useState } from 'react';
import Post from '../Components/Post';
import { url } from '../Utils/url';

function HomeView() {
    const [posts, setPosts] = useState([]);
    console.log(posts);
    useEffect(() => {
        fetch(`${url}posts`)
            .then((response) => response.json())
            .then((data) => setPosts(data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <h1>Home</h1>
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
}

export default HomeView;

