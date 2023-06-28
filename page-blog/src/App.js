import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeView from './Views/HomeView';
import AddPostView from './Views/AddPostView';
import SinglePostView from './Views/SinglePostView';
import EditPostView from './Views/EditPostView';
import DeletePostView from './Views/DeletePostView';
import Navbar from './Components/Navbar';

function App() {
  return (
    <Router>
      <div>
        <h1>Page-blog</h1>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/add-post" element={<AddPostView />} />
          <Route path="/post/:id" element={<SinglePostView />} />
          <Route path="/post/:id/edit" element={<EditPostView />} />
          <Route path="/post/:id/delete" element={<DeletePostView />} />
        </Routes>

        <footer>Page-blog © {new Date().getFullYear()}</footer>
      </div>
    </Router>
  );
}

export default App;

