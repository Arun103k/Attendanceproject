// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// MongoDB connection
mongoose.connect('mongodb+srv://arun_103:jkdKF87sG5AiGCYM@cluster0.lwavg38.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

// Body parser middleware
app.use(bodyParser.json());

// Attendance model
const Attendance = mongoose.model('Attendance', {
  date: Date,
  present: Boolean,
  userId: String,
});

// API endpoint to get attendance for a specific user on a specific date
app.get('/api/attendance/:userId/:date', async (req, res) => {
  const { userId, date } = req.params;

  try {
    const attendance = await Attendance.findOne({ userId, date });
    res.json(attendance);
  } catch (error) {
    res.status(500).send(error);
  }
});

// API endpoint to mark attendance
app.post('/api/attendance', async (req, res) => {
  const { userId, date, present } = req.body;

  try {
    let attendance = await Attendance.findOne({ userId, date });

    if (!attendance) {
      attendance = new Attendance({ userId, date, present });
    } else {
      attendance.present = present;
    }

    await attendance.save();
    res.json(attendance);
  } catch (error) {
    res.status(500).send(error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
