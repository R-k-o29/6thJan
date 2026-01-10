let express = require('express');
const { bookInsert, bookView, bookDelete, bookUpdate, getSingleBook } = require('../controllers/libraryController');

let libraryRouter = express.Router();

libraryRouter.post('/insert',bookInsert);
libraryRouter.get('/view',bookView)
libraryRouter.delete('/delete/:id',bookDelete)
libraryRouter.put('/update/:id',bookUpdate)
libraryRouter.get('/view/:id',getSingleBook);


module.exports = {libraryRouter};