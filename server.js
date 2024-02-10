const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chat_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connection to database');
    } else {
        console.log('Connected to database');
    }
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const sql = `SELECT * FROM messages`;
    db.query(sql, (error, results) => {
      if (error) throw error;
      res.render('index', { messages: results });
    });
});

app.post('/send', (req, res) => {
    const username = req.body.username;
    const message = req.body.message;
    const sql = `INSERT INTO messages (username, message) VALUES (?, ?)`;
    db.query(sql, [username, message], (error, results) => {
      if (error) throw error;
      res.redirect('/');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`);
});