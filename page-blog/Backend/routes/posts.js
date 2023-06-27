const express = require('express');
const router = express.Router();
const sequelize = require('../db/connection');

// Ruta para obtener todas las publicaciones
router.get('/', async (req, res) => {
    try {
        // Consulta a la base de datos para obtener todas las publicaciones
        const posts = await sequelize.query('SELECT * FROM post', {
            type: sequelize.QueryTypes.SELECT,
        });
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las publicaciones' });
    }
});

module.exports = router;
