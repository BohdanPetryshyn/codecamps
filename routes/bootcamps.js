const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({success: true, data: {message: 'Getting all bootcamps'}});
});

router.get('/:id', (req, res) => {
  res.status(200).json({success: true, data: {message: `Getting bootcamp with id=${req.params.id}`}});
});

router.post('/', (req, res) => {
  res.status(200).json({success: true, data: {message: 'Creating a bootcamp'}});
});

router.put('/:id', (req, res) => {
  res.status(200).json({success: true, data: {message: `Updating bootcamp with id=${req.params.id}`}});
});

router.delete('/:id', (req, res) => {
  res.status(200).json({success: true, data: {message: `Deleting bootcamp with id=${req.params.id}`}});
});

module.exports = router;