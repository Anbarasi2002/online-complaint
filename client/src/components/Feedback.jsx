// frontend/src/components/Feedback.js
import { useState } from 'react';
import axios from 'axios';

const Feedback = ({ complaintId }) => {
  const [rating, setRating] = useState(0);

  const submitFeedback = () => {
    axios.post(`/complaints/${complaintId}/feedback`, { rating })
      .then(res => alert('Feedback submitted'))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Rate your experience</h2>
      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <button onClick={submitFeedback}>Submit</button>
    </div>
  );
};

export default Feedback;
