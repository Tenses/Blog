const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const postsRouter = require('./routes/posts');
const path = require('path');

app.use(bodyParser.json());
app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use('/posts', postsRouter);

app.listen(3000, () => {
    console.log('Servidor en funcionamiento en el puerto 3000');
});
