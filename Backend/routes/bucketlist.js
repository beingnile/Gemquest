const express = require('express');
const router = express.Router();
const BucketListItem = require('../models/BucketListItem');

// Get all items
router.get('/', async (req, res) => {
    try {
        const items = await BucketListItem.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one item
router.get('/:id', getItem, (req, res) => {
    res.json(res.item);
});

// Create an item
router.post('/', async (req, res) => {
    const item = new BucketListItem({
        item: req.body.item,
        location: req.body.location,
        budget: req.body.budget,
    });
    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an item
router.patch('/:id', getItem, async (req, res) => {
    if (req.body.item != null) {
        res.item.item = req.body.item;
    }
    if (req.body.location != null) {
        res.item.location = req.body.location;
    }
    if (req.body.budget != null) {
        res.item.budget = req.body.budget;
    }
    try {
        const updatedItem = await res.item.save();
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an item
router.delete('/:id', getItem, async (req, res) => {
    try {
        await res.item.remove();
        res.json({ message: 'Deleted item' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getItem(req, res, next) {
    let item;
    try {
        item = await BucketListItem.findById(req.params.id);
        if (item == null) {
            return res.status(404).json({ message: 'Cannot find item' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.item = item;
    next();
}

module.exports = router;