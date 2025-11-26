// src/routes/categories.routes.js
const express = require('express');
const { readJson } = require('../utils/fileDb');

const router = express.Router();
const FILE_NAME = 'categories.json';

router.get('/', (req, res) => {
  try {
    const categories = readJson(FILE_NAME);
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener categorías' });
  }
});

module.exports = router;
