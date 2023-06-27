const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const postsRouter = require('./routes/posts');

app.use(bodyParser.json());
app.use('/posts', postsRouter);

app.listen(3000, () => {
    console.log('Servidor en funcionamiento en el puerto 3000');
});
