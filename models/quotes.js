"use strict";

const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./db/quotes.db');

module.exports.getAll = () => {
  const QUERY_QUOTE_ALL = `SELECT * FROM quotes`;

  return new Promise((resolve, reject) => {
    db.all(QUERY_QUOTE_ALL, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

module.exports.getRandom = () => {
  const QUERY_QUOTE_RANDOM = `SELECT * FROM quotes AS q
    LEFT JOIN authors AS a ON q.author_id = a.author_id
    LEFT JOIN contributors AS c ON q.contributor_id = c.contributor_id
    ORDER BY RANDOM() LIMIT 1;`

  return new Promise((resolve, reject) => {
    db.get(QUERY_QUOTE_RANDOM, (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

module.exports.getById = (id) => {
  const QUERY_QUOTE_BY_ID = `SELECT * FROM quotes AS q
    LEFT JOIN authors AS a ON q.author_id = a.author_id
    LEFT JOIN contributors AS c ON q.contributor_id = c.contributor_id
    WHERE quote_id = ?`;

  return new Promise((resolve, reject) => {
    db.get(QUERY_QUOTE_BY_ID, id, (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};
