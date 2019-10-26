require('dotenv').config();
const db = require('../config/db.config.js');

db.sequelize.sync({force: true})
    .then(() => {
	    console.log('Drop and Resync with { force: true }');
    })
    .catch(error => {
        console.log(error);
    });
