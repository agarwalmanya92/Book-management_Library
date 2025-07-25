require('dotenv').config({ debug: false });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

/* ---------- MongoDB CONNECTION ---------- */
mongoose.set('strictQuery', false);
mongoose.Promise = global.Promise;

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI is not defined in .env');
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ DB connection error:', err.message);
    process.exit(1);
  });

/* ---------- GLOBAL MIDDLEWARE ---------- */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

/* ---------- ROUTES ---------- */
app.use('/api', require('./routes/libraryRoutes'));
app.use('/api/v1', require('./routes/contactRoutes'));

/* ✅ Default route for health check */
app.get("/", (req, res) => {
  res.send("✅ API is working! Use /api/books or /api/v1/contact");
});

/* ---------- ERROR HANDLERS ---------- */
app.use((req, res, next) => {
  setImmediate(() => next(new Error('Route not found')));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).send(err.message);
});

/* ---------- START SERVER ---------- */
const PORT = process.env.PORT;
if (!PORT) {
  throw new Error('PORT is not defined in .env');
}

app.listen(PORT, () =>
  console.log(`🚀 Server running → http://localhost:${PORT}`)
);
