import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeView from './Views/HomeView';
import AddPostView from './Views/AddPostView';
import SinglePostView from './Views/SinglePostView';
import Navbar from './Components/Navbar';
import Header from './Components/Header';
import Footer from './Components/Footer';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Navbar />

        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/add-post" element={<AddPostView />} />
          <Route path="/posts/:id" element={<SinglePostView />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;