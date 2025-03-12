import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Typography, CircularProgress, Chip } from '@mui/material';
import api from '../config/api';

const ComplaintDetails = () => {
    const [complaint, setComplaint] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    // Function to return color based on status
    const getStatusColor = (status) => {
        switch (status) {
            case 'Registered': return 'warning';  // Yellow
            case 'Under Investigation': return 'primary';  // Blue
            case 'Resolved': return 'success';  // Green
            default: return 'default';
        }
    };

    const user = JSON.parse(localStorage.getItem("user"));
    const id = user.id;

    useEffect(() => {
        const fetchComplaintDetails = async () => {
            try {
                const response = await api.get(`/complaints/${id}`);
                setComplaint(response.data[response.data.length-1]);
            } catch (err) {
                setError('Error fetching complaint details');
            } finally {
                setLoading(false);
            }
        };

        fetchComplaintDetails();
    }, [id]);

    if (loading) return <Box textAlign="center" mt={4}><CircularProgress /></Box>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
            <Card sx={{ p: 2 }}>
                {complaint?.vehicleImage && (
                    <CardMedia
                        component="img"
                        height="300"
                        image={"http://localhost:5000/" + complaint.vehicleImage}
                        alt="Vehicle Image"
                        sx={{ objectFit: 'cover', borderRadius: 2 }}
                    />
                )}
                <CardContent>
                    <Typography variant="h5" gutterBottom>Complaint Details</Typography>
                    <Typography><strong>Vehicle Make:</strong> {complaint?.vehicleDetails?.make}</Typography>
                    <Typography><strong>Vehicle Model:</strong> {complaint?.vehicleDetails?.model}</Typography>
                    <Typography><strong>Vehicle Color:</strong> {complaint?.vehicleDetails?.color}</Typography>
                    <Typography><strong>VIN:</strong> {complaint?.vehicleDetails?.vin}</Typography>
                    <Typography><strong>Theft Date:</strong> {new Date(complaint?.theftDate).toLocaleDateString()}</Typography>
                    <Typography><strong>Location:</strong> {complaint?.location}</Typography>
                    {/* Status with color-coded Chip */}
                    <Box mt={1}>
                        <Chip label={complaint?.status} color={getStatusColor(complaint?.status)} />
                    </Box>
                    <Typography><strong>Reported By:</strong> {complaint?.userId}</Typography>
                </CardContent>
            </Card>            
        </Box>
    );
};

export default ComplaintDetails;
