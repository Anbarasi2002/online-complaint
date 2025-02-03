// frontend/src/components/ComplaintForm.js
import { useState } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const ComplaintForm = ({ google }) => {
  const [location, setLocation] = useState({ lat: 37.7749, lng: -122.4194 });


  const [formData, setFormData] = useState({ vehicleType: '', theftDate: '', location: '', documents: [] });

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onMapClick = (t, map, c) => setFormData({ ...formData, location: { lat: c.latLng.lat(), lng: c.latLng.lng() } });

  const onFileChange = (e) => setFormData({ ...formData, documents: [...e.target.files] });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/complaint', formData);
      alert('Complaint submitted successfully');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
    
      <h2>Report Theft</h2>
      <form onSubmit={onSubmit}>
        <input type="text" name="vehicleType" value={formData.vehicleType} onChange={onChange} placeholder="Vehicle Type" required />
        <input type="date" name="theftDate" value={formData.theftDate} onChange={onChange} required />
        <input type="file" multiple onChange={onFileChange} />
        <Map
          google={google}
          zoom={14}
          initialCenter={location}
          onClick={onMapClick}
        >
          <Marker position={location} />
        </Map>
      </form>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
})(ComplaintForm);
