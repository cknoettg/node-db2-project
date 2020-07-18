const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
    .then(cars => {
        res.status(200).json(cars);
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;

    getById(id)
    .then(car => {
        res.status(200).json(car)
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})

router.post('/', (req, res) => {
    const carData = req.body;

    db('cars').insert(carData)
    .then(ids => {
        return getById(ids[0]).then(newCar => {
            res.status(201).json(newCar)
        })
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    db('cars').where({id}).update(updates)
    .then(count => {
        res.status(200).json(count)
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    db('cars').where({id}).del()
    .then(count => {
        res.status(200).json(count)
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})

module.exports = router;

function getById(id) {
    return db('cars')
        .where({id})
        .first();
}