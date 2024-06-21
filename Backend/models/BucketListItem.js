const mongoose = require('mongoose');

const bucketListItemSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('BucketListItem', bucketListItemSchema);