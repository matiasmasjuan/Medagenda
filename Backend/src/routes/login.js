const express = require('express');
const db = require('../models');
const router = express.Router();
const jwtgenerator = require('jsonwebtoken');

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.User.findOne({ where: {email} });
    if (!user || !user.checkPassword(password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  
    const token = jwtgenerator.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({
      ...user.dataValues,
      access_token: token,
      token_type: 'Bearer',
    });

  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: `Internal server error. Cannot Post Login` });
  }
});

module.exports = router;