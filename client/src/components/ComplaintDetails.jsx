// ComplaintDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ComplaintDetails = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const res = await axios.get(`/complaints/${id}`);
        setComplaint(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchComplaint();
  }, [id]);

  if (!complaint) return <div>Loading...</div>;

  return (
    <div>
      <h2>Complaint Details</h2>
      <p>{complaint.details}</p>
      <p>Status: {complaint.status}</p>
      <p>Date: {complaint.date}</p>
      <ul>
        {complaint.documents.map((doc, index) => (
          <li key={index}>{doc.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ComplaintDetails;
