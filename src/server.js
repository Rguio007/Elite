const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 5000;

app.use(bodyParser.json());


const db = new sqlite3.Database('characters.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    db.run(
      'CREATE TABLE IF NOT EXISTS characters (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, species TEXT, origin TEXT, status TEXT)',
      (err) => {
        if (err) {
          console.error('Error creating characters table:', err.message);
        } else {
          console.log('Characters table created or already exists');
        }
      }
    );
  }
});


app.post('/api/addCharacter', (req, res) => {
  const { name, species, origin, status } = req.body;
  const query = 'INSERT INTO characters (name, species, origin, status) VALUES (?, ?, ?, ?)';
  const values = [name, species, origin, status];

  db.run(query, values, function (err) {
    if (err) {
      console.error('Error adding character:', err.message);
      res.status(500).json({ error: 'Error adding character' });
    } else {
      console.log(`Character added with ID: ${this.lastID}`);
      res.status(200).json({ id: this.lastID });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


const cors = require('cors');
app.use(cors());