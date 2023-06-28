const express = require('express');
const router = express.Router();
const sequelize = require('../db/connection');

router.get('/', async (req, res) => {
    try {
        const posts = await sequelize.query('SELECT id, post_title, post_content, image_url FROM posts', {
            type: sequelize.QueryTypes.SELECT,
        });

        const formattedPosts = posts.map((post) => ({
            id: post.id,
            post_title: post.post_title,
            post_content: post.post_content,
            image_url: `http://localhost:3000/images/${post.image_url}`,
        }));

        res.json(formattedPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las publicaciones' });
    }
});

router.get('/:id', async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await sequelize.query('SELECT * FROM posts WHERE id = ?', {
            replacements: [postId],
            type: sequelize.QueryTypes.SELECT,
        });

        if (post.length === 0) {
            return res.status(404).json({ error: 'Publicación no encontrada' });
        }

        res.json(post[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la publicación' });
    }
});


router.post('/', async (req, res) => {
    const { post_title, post_content, image_url } = req.body;

    try {
        const newPost = await sequelize.query(
            'INSERT INTO posts (post_title, post_content, image_url) VALUES (?, ?, ?)', {
            type: sequelize.QueryTypes.INSERT,
            replacements: [post_title, post_content, image_url],
        }
        );

        res.json({ message: 'Nueva publicación creada', post_id: newPost[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la publicación' });
    }
});


router.put('/:id', async (req, res) => {
    const postId = req.params.id;
    const { post_title, post_content, image_url } = req.body;

    try {
        const existingPost = await sequelize.query('SELECT * FROM posts WHERE id = ?', {
            replacements: [postId],
            type: sequelize.QueryTypes.SELECT,
        });

        if (existingPost.length === 0) {
            return res.status(404).json({ error: 'Publicación no encontrada' });
        }

        await sequelize.query('UPDATE posts SET post_title = ?, post_content = ?, image_url = ? WHERE id = ?', {
            replacements: [post_title, post_content, image_url, postId],
            type: sequelize.QueryTypes.UPDATE,
        });

        res.json({ message: 'Publicación actualizada', post_id: postId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la publicación' });
    }
});


router.delete('/:id', async (req, res) => {
    const postId = req.params.id;

    try {
        const existingPost = await sequelize.query('SELECT * FROM posts WHERE id = ?', {
            replacements: [postId],
            type: sequelize.QueryTypes.SELECT,
        });
        if (existingPost.length === 0) {
            return res.status(404).json({ error: 'Publicación no encontrada' });
        }

        await sequelize.query('DELETE FROM posts WHERE id = ?', {
            replacements: [postId],
            type: sequelize.QueryTypes.DELETE,
        });

        res.json({ message: 'Publicación eliminada', post_id: postId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la publicación' });
    }
});

module.exports = router;
