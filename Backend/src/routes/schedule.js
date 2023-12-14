const express = require('express');
const { Op } = require("sequelize");
const router = express.Router();
const db = require('../models');

router.get('/', async (req, res) => {
  try {
    const { doctorId } = req.query;
    let schedules;

    if (doctorId) {
      schedules = await db.Schedule.findAll({
        where: { doctorId },
      });
    } else {
      schedules = await db.Schedule.findAll();
    }
    res.json(schedules);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/calendar', async (req, res) => {
  try {
    const { day, professionId } = req.query;
    const startDate = new Date(`${day}T00:00:00Z`);
    const endDate = new Date(`${day}T23:59:59Z`);

    const schedules = await db.Schedule.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate]
        },
      },
      include: [
        {
          model: db.User,
          where: {
            role: 'Doctor',
            professionId: professionId
          },
          include: [
            { 
              model: db.Profession, 
            }
          ],
        },
        {
          model: db.Module,
        },
        {
          model: db.Appointment,
        }
      ],
      order: [
        ['moduleId', 'ASC'],
      ]
    });

    res.json(schedules);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const schedule = await db.Schedule.findByPk(req.params.id);
    res.json(schedule);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Internal server error. Cannot Get schedule with id ${req.params.id}` });
  }
});

router.post('/', async (req, res) => {
  try {
    const schedule = await db.Schedule.create(req.body);
    res.json(schedule);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error. Cannot Post Schedule' });
  }
});

module.exports = router;