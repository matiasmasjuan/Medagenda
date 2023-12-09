const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth')
const db = require('../models');

router.get('/', async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Internal server error. Cannot Get user with id ${req.params.id}` });
  }
});

router.post('/', async (req, res) => {
  try {
      const user = await db.User.create(req.body);
      res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error. Cannot Post User' });
  }
});

module.exports = router;