// src/App.js
import './App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [userId, setUserId] = useState('user123');
  const [date, setDate] = useState('');
  const [present, setPresent] = useState(false);
  const [attendance, setAttendance] = useState(null);

  useEffect(() => {
    // Fetch attendance data when component mounts
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await axios.get(`/api/attendance/${userId}/${date}`);
      setAttendance(response.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  const markAttendance = async () => {
    try {
      await axios.post('/api/attendance', { userId, date, present });
      // Refresh attendance data after marking
      fetchAttendance();
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  return (
    <div>
      <h1>Attendance App</h1>
      <div>
        <label>User ID: </label>
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
      </div>
      <div>
        <label>Date: </label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div>
        <label>Present: </label>
        <input type="checkbox" checked={present} onChange={() => setPresent(!present)} />
      </div>
      <button onClick={markAttendance}>Mark Attendance</button>
      {attendance && (
        <div>
          <h2>Attendance for {date}</h2>
          <p>User ID: {attendance.userId}</p>
          <p>Present: {attendance.present ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
}

export default App;
