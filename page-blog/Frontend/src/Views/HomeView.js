import React, { useEffect, useState, useCallback } from 'react';
import Post from '../Components/Post';
import { url } from '../Utils/url';
import '../styles/HomeView.css';

function HomeView() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchPosts = useCallback(() => {
        fetch(`${url}posts?page=${currentPage}`)
            .then((response) => response.json())
            .then((data) => {
                const { currentPage, totalPages, posts } = data;
                setPosts(posts);
                setCurrentPage(currentPage);
                setTotalPages(totalPages);
            })
            .catch((error) => console.error(error));
    }, [currentPage]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

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

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="homeview-container">
            <h1 className="text-center">Inicio</h1>
            <div className="row">
                {posts.map((post) => (
                    <div className="col-md-12" key={post.id}>
                        <Post post={post} onDelete={() => handleDelete(post.id)} />
                    </div>
                ))}
            </div>
            <div className="pagination">
                <div className="pagination-text">Página {currentPage} de {totalPages}</div>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                    <button
                        key={pageNumber}
                        className={pageNumber === currentPage ? 'active' : ''}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default HomeView;