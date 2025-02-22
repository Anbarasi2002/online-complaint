import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, OutlinedInput, CircularProgress } from '@mui/material';
import axios from 'axios';
import api from '../config/api';

const ComplaintForm = () => {
    const [vehicleDetails, setVehicleDetails] = useState({
        vin: '',
        make: '',
        model: '',
        color: '',
        theftDate: '',
        location: ''
    });
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicleDetails({
            ...vehicleDetails,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
    
        // Flatten vehicleDetails by appending each field separately
        Object.entries(vehicleDetails).forEach(([key, value]) => {
            formData.append(key, value);
        });
    
        if (image) {
            formData.append('vehicleImage', image);
        }
    
        try {
            const response = await api.post('/complaints', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
    
            console.log(response.data);
            setMessage('Complaint submitted successfully!');
            setVehicleDetails({ vin: '', make: '', model: '', color: '', theftDate: '', location: '' });
            setImage(null);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            setMessage('Error submitting complaint. Please try again.');
        }
        setLoading(false);
    };
    
    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5, p: 3 }}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom>Report Vehicle Theft</Typography>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <OutlinedInput fullWidth margin="normal" placeholder="VIN" name="vin" value={vehicleDetails.vin} onChange={handleChange} required />
                    <OutlinedInput fullWidth margin="normal" placeholder="Make" name="make" value={vehicleDetails.make} onChange={handleChange} required />
                    <OutlinedInput fullWidth margin="normal" placeholder="Model" name="model" value={vehicleDetails.model} onChange={handleChange} required />
                    <OutlinedInput fullWidth margin="normal" placeholder="Color" name="color" value={vehicleDetails.color} onChange={handleChange} required />
                    <TextField fullWidth margin="normal" label="Theft Date" type="date" name="theftDate" value={vehicleDetails.theftDate} onChange={handleChange} required InputLabelProps={{ shrink: true }} />
                    <OutlinedInput fullWidth margin="normal" placeholder="Location" name="location" value={vehicleDetails.location} onChange={handleChange} required />
                    <OutlinedInput type="file" onChange={handleImageChange} sx={{ mt: 2, mb: 2 }} />
                    <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Submit Complaint'}
                    </Button>
                </form>
                {message && <Typography color="secondary" sx={{ mt: 2 }}>{message}</Typography>}
            </Paper>
        </Box>
    );
};

export default ComplaintForm;
