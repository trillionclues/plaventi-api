const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const taskRouter = require('./routes/event');

// express instance
const app = express();

// CORS middleware
app.use(cors());
app.use(express.json());
app.use('/events', taskRouter);

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.log(`Error connecting to MongoDB: ${err}`);
});

db.once('open', () => {
  console.log('Connected!');
});

// Event API routes
app.use('/', (req, res) => {
  res.send('Hello World');
});

// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
