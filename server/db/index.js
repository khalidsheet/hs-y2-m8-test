const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("db/database.sqlite");

/**
 * Create reservations table
 */
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    people INTEGER NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    message TEXT
  )`);
});

function createReservation({
  name,
  email,
  phone,
  people,
  date,
  time,
  message,
}) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO reservations (name, email, phone, people, date, time, message) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, email, phone, people, date, time, message],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
}

function getReservations() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM reservations ORDER BY id DESC`, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

module.exports = {
  createReservation,
  getReservations,
};
