import express from "express";
import pg from "pg";
import cors from "cors";
import helmet from "helmet";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(helmet());

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "carbon",
  password: "divyam@post",
  port: 5432,
});

db.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Database connection error', err.stack));

// GET route
app.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM login');
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Server Error');
  }
});

// POST route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await db.query('SELECT id from login where username=$1 and password=$2', [username,password]);
    if(result.rows.length>0)
      console.log("user exsist");
    else if(result.rows.length===0)
      console.log("error");
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
