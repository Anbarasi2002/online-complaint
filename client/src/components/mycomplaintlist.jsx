import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, CircularProgress, Grid, Chip } from '@mui/material';
import api from '../config/api';

const MyComplaintlist = () => {
    const [complaints, setComplaint] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const user = JSON.parse(localStorage.getItem("user"));
    const id = user.id;

    useEffect(() => {
        const fetchComplaintDetails = async () => {
            try {
                const response = await api.get(`/complaints/${id}`);
                setComplaint(response.data);
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

    // Function to return color based on status
    const getStatusColor = (status) => {
        switch (status) {
            case 'Registered': return 'warning';  // Yellow
            case 'Under Investigation': return 'primary';  // Blue
            case 'Resolved': return 'success';  // Green
            default: return 'default';
        }
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 5 }}>
            <Grid container spacing={2}>
                {complaints.map((complaint, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ p: 1, borderRadius: 2, boxShadow: 3 }}>
                            {complaint?.vehicleImage && (
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={"http://localhost:5000/" + complaint.vehicleImage}
                                    alt="Vehicle Image"
                                    sx={{ objectFit: 'cover', borderRadius: 2 }}
                                />
                            )}
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {complaint.vehicleDetails?.make} {complaint.vehicleDetails?.model}
                                </Typography>
                                <Typography variant="body2"><strong>Color:</strong> {complaint.vehicleDetails?.color}</Typography>
                                <Typography variant="body2"><strong>VIN:</strong> {complaint.vehicleDetails?.vin}</Typography>
                                <Typography variant="body2"><strong>Theft Date:</strong> {new Date(complaint.theftDate).toLocaleDateString()}</Typography>
                                <Typography variant="body2"><strong>Location:</strong> {complaint.location}</Typography>
                                
                                {/* Status with color-coded Chip */}
                                <Box mt={1}>
                                    <Chip label={complaint.status} color={getStatusColor(complaint.status)} />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default MyComplaintlist;
