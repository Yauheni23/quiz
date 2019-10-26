const game = require('./mockData');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/game', (req, res) => {
    const resGame = game.sort(function(){
        return Math.random() - 0.5;
    }).slice(0, 10);

    res.send({game: resGame});
});

const server = app.listen(8080, function () {
    let port = server.address().port;
    console.log(`App listening at http://localhost:${port}`)
})
