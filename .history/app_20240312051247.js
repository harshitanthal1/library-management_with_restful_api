const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/books', bookRoutes);

mongoose.connect('mongodb://localhost:27017/library', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
