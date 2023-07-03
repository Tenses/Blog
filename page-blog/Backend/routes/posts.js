const express = require('express');
const router = express.Router();
const sequelize = require('../db/connection');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// gestor de archivos de imagen para cogerlos y meterlos en public/images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        const filename = `${Date.now()}_${file.originalname}`;
        cb(null, filename);
    },
});
const upload = multer({ storage });

router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const postsPerPage = 4;

    try {
        const offset = (page - 1) * postsPerPage;

        const postsCount = await sequelize.query('SELECT COUNT(*) AS count FROM posts', {
            type: sequelize.QueryTypes.SELECT,
        });
        const totalPosts = postsCount[0].count;

        const posts = await sequelize.query('SELECT id, post_title, post_content, image_url, date FROM posts ORDER BY id DESC LIMIT :limit OFFSET :offset', {
            replacements: { limit: postsPerPage, offset },
            type: sequelize.QueryTypes.SELECT,
        });

        const formattedPosts = posts.map((post) => ({
            id: post.id,
            post_title: post.post_title,
            post_content: post.post_content,
            image_url: `http://localhost:3000/images/${post.image_url}`,
            date: post.date,
        }));

        res.json({
            currentPage: page,
            totalPages: Math.ceil(totalPosts / postsPerPage),
            posts: formattedPosts,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las publicaciones' });
    }
});

router.get('/:id', async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await sequelize.query('SELECT id, post_title, post_content, image_url, date FROM posts WHERE id = ?', {
            replacements: [postId],
            type: sequelize.QueryTypes.SELECT,
        });

        if (post.length === 0) {
            return res.status(404).json({ error: 'Publicación no encontrada' });
        }

        const formattedPost = {
            id: post[0].id,
            post_title: post[0].post_title,
            post_content: post[0].post_content,
            image_url: `http://localhost:3000/images/${post[0].image_url}`,
            date: post[0].date,
        };

        res.json(formattedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la publicación' });
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    const { post_title, post_content } = req.body;
    const image_url = req.file.filename;
    const date = new Date().toISOString();

    try {
        const newPost = await sequelize.query(
            'INSERT INTO posts (post_title, post_content, image_url, date) VALUES (?, ?, ?, ?)',
            {
                type: sequelize.QueryTypes.INSERT,
                replacements: [post_title, post_content, image_url, date],
            }
        );

        res.json({ message: 'Nueva publicación creada', post_id: newPost[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la publicación' });
    }
});

router.put('/:id', upload.single('image'), async (req, res) => {
    const postId = req.params.id;
    const { post_title, post_content } = req.body;
    let image_url = null;
    const date = new Date().toISOString();

    try {
        const existingPost = await sequelize.query('SELECT * FROM posts WHERE id = ?', {
            replacements: [postId],
            type: sequelize.QueryTypes.SELECT,
        });

        if (existingPost.length === 0) {
            return res.status(404).json({ error: 'Publicación no encontrada' });
        }
        if (req.file) {
            const previousImageFileName = existingPost[0].image_url;
            const previousImagePath = path.join(__dirname, '..', 'public', 'images', previousImageFileName);
            fs.unlinkSync(previousImagePath);

            image_url = req.file.filename;
        } else {
            image_url = existingPost[0].image_url;
        }

        await sequelize.query(
            'UPDATE posts SET post_title = :post_title, post_content = :post_content, image_url = :image_url, date = :date WHERE id = :postId',
            {
                replacements: { post_title, post_content, image_url, date, postId },
                type: sequelize.QueryTypes.UPDATE,
            }
        );

        const updatedPost = await sequelize.query('SELECT * FROM posts WHERE id = ?', {
            replacements: [postId],
            type: sequelize.QueryTypes.SELECT,
        });

        res.json(updatedPost[0]);
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

        const imageFileName = existingPost[0].image_url;

        await sequelize.query('DELETE FROM posts WHERE id = ?', {
            replacements: [postId],
            type: sequelize.QueryTypes.DELETE,
        });
        const imagePath = path.join(__dirname, '..', 'public', 'images', imageFileName);
        fs.unlink(imagePath, (error) => {
            if (error) {
                console.error('Error al eliminar la imagen:', error);
            }
        });

        res.json({ message: 'Publicación eliminada', post_id: postId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la publicación' });
    }
});

module.exports = router;