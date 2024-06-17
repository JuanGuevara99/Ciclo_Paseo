const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const userRoutes = require('./routers/userRoutes');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRoutes);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});