const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', async (req, res) => {
  try {
    const { patientId } = req.query;
    let appointments;
    if (patientId) {
      appointments = await db.Appointment.findAll({
        where: { patientId },
        include: [
          {
            model: db.Schedule,
            include: [
              {
              model: db.Module
              },
              {
                model: db.User,
                include: [
                  {
                  model: db.Profession
                  }
                ],
              }
            ],
          },
        ],
      });
    }
    else {
      appointments = await db.Appointment.findAll();
    }
    res.json(appointments);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const appointment = await db.Appointment.findByPk(req.params.id);
    res.json(appointment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Internal server error. Cannot Get appointment with id ${req.params.id}` });
  }
});

router.post('/', async (req, res) => {
  try {
    const appointment = await db.Appointment.create(req.body);
    res.json(appointment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error. Cannot Post Appointment' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const appointment = await db.Appointment.findByPk(req.params.id);
    await appointment.update(req.body);
    res.json(appointment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error. Cannot Post Appointment' });
  }
});

module.exports = router;