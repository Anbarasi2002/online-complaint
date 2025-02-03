// ComplaintList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get('/complaints');
        setComplaints(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchComplaints();
  }, []);

  return (
    <div>
      <h2>Your Complaints</h2>
      <ul>
        {complaints.map(complaint => (
          <li key={complaint._id}>
            <Link to={`/complaints/${complaint._id}`}>{complaint.details}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComplaintList;
