'use strict';
//const pool = require('../database/db');
const promisePool = require('../database/db').promise();

const getAllCats = async () => {
  try {
    const [rows] = await promisePool.query('SELECT cat_id, wop_cat.name, age, weight, owner, filename, user_id, wop_user.name AS ownername FROM wop_cat LEFT JOIN wop_user ON owner = user_id');
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const getCat = async (id) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM wop_cat WHERE cat_id = ?', [ id ]);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
  }
};

const insertCat = async (cat) => {
  try {
    console.log('insert cat?', cat);
    const [rows] = await promisePool.query('INSERT INTO wop_cat (name, age, weight, owner, filename) VALUES (?, ?, ?, ?, ?)', [ cat.name, cat.age, cat.weight, cat.owner, cat.filename ]);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const updateCat = async (cat) => {
  try {
    console.log('insert cat?', cat);
    const [rows] = await promisePool.query('UPDATE wop_cat SET name = ?, age = ?, weight = ?, owner = ? WHERE wop_cat.cat_id = ?', [ cat.name, cat.age, cat.weight, cat.owner, cat.id ]);
    return rows;
  } catch (e) {
    console.error('updateCat model crash', e.message);
  }
};

const deleteCat = async (id) => {
  try {
    console.log('delete cat', id);
    const [rows] = await promisePool.query('DELETE FROM wop_cat WHERE wop_cat.cat_id = ?', [ id ]);
    console.log('deleted?', rows);
    return rows;
  } catch (e) {
    console.error('deleteCat model', e.message);
  }
}

module.exports = {
  getAllCats,
  getCat,
  insertCat,
  updateCat,
  deleteCat,
};
