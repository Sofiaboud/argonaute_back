const express = require('express');
const usersRouter = express.Router();

const { db } = require('../config');

usersRouter.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT idusers, name FROM users; ');
  res.status(200).json(rows);
});

usersRouter.post('/', async (req, res) => {
  const { name } = req.body;

  await db.query('INSERT INTO users (name) VALUES(?)', [name]);
  res.status(201).send('its ok');
});

usersRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  let sqlValues = [id];
  const sql = 'DELETE FROM users WHERE idusers = ? ';
  try {
    const [results] = await db.query(sql, sqlValues);
    res.status(201).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error deleting an user');
  }
});

module.exports = usersRouter;
