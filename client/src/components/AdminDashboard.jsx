// frontend/src/components/AdminDashboard.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    axios.get('/admin/complaints')
      .then(res => setComplaints(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        {complaints.map(complaint => (
          <li key={complaint._id}>{complaint.details}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
