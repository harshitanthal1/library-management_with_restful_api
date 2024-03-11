const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.getAllBooks);
router.post('/', bookController.addBook);
router.put('/:id/borrow', bookController.borrowBook);
router.put('/:id/return', bookController.returnBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
