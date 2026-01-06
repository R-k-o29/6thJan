let express = require('express');
const { bookInsert } = require('../controllers/libraryController');

let libraryRouter = express.Router();

libraryRouter.post('/insert',bookInsert);


module.exports = {libraryRouter};