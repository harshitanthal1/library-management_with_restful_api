const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addBook = async (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author
    });

    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.borrowBook = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (book.status === 'available') {
            book.status = 'borrowed';
            await book.save();
            res.json(book);
        } else {
            res.status(400).json({ message: 'Book is already borrowed' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.returnBook = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (book.status === 'borrowed') {
            book.status = 'available';
            await book.save();
            res.json(book);
        } else {
            res.status(400).json({ message: 'Book is already available' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        await Book.findByIdAndDelete(id);
        res.json({ message: 'Book deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
