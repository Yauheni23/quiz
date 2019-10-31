const game = require('./mockData');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.json());

require('./src/router')(app);

app.get('/game', (req, res) => {
    console.log(req.query);
    res.send({game: game.filter(el => el.category === req.query.category)});
});

const server = app.listen(8080, () => {
    let port = server.address().port;
    console.log(`App listening at http://localhost:${port}`)
});
