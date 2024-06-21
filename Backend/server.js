const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/gemquest');

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define routes
app.use('/api/bucketlist', require('./routes/bucketlist'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
