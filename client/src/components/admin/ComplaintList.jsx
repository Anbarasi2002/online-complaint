import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, Select } from '@mui/material';
import api from '../../config/api';

const ComplaintList = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await api.get('/complaints'); // Adjust the endpoint as necessary
                setComplaints(response.data);
                console.log(response.data);
            } catch (err) {
                setError('Failed to fetch complaints');
            } finally {
                setLoading(false);
            }
        };

        fetchComplaints();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        console.log(id, newStatus);
        
        try {
            await api.put(`/complaints/${id}/status`, { status: newStatus });
            setComplaints(complaints.map(complaint => 
                complaint._id === id ? { ...complaint, status: newStatus } : complaint
            ));
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Pending': return { color: '#ff9800', backgroundColor: '#fff3e0' }; // Orange
            case 'Under Investigation': return { color: '#2196f3', backgroundColor: '#e3f2fd' }; // Blue
            case 'Resolved': return { color: '#4caf50', backgroundColor: '#e8f5e9' }; // Green
            case 'Registered': return { color: '#9c27b0', backgroundColor: '#f3e5f5' }; // Purple
            default: return { color: '#000', backgroundColor: '#f5f5f5' }; // Black/Gray
        }
    };

    if (loading) {
        return <div>Loading complaints...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Complaints List</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Vehicle</strong></TableCell>
                            <TableCell><strong>Theft Date</strong></TableCell>
                            <TableCell><strong>Location</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {complaints.map(complaint => (
                            <TableRow key={complaint._id}>
                                <TableCell>{complaint.vehicleDetails.make} {complaint.vehicleDetails.model}</TableCell>
                                <TableCell>{new Date(complaint.theftDate).toLocaleDateString()}</TableCell>
                                <TableCell>{complaint.location}</TableCell>
                                <TableCell>
                                    <Select
                                        value={complaint.status}
                                        onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                                        sx={{ ...getStatusStyles(complaint.status), fontWeight: 'bold', borderRadius: 1, p: 1 }}
                                    >
                                        <MenuItem value="Pending" sx={{ color: '#ff9800', backgroundColor: '#fff3e0' }}>Pending</MenuItem>
                                        <MenuItem value="Under Investigation" sx={{ color: '#2196f3', backgroundColor: '#e3f2fd' }}>Under Investigation</MenuItem>
                                        <MenuItem value="Resolved" sx={{ color: '#4caf50', backgroundColor: '#e8f5e9' }}>Resolved</MenuItem>
                                        <MenuItem value="Registered" sx={{ color: '#9c27b0', backgroundColor: '#f3e5f5' }}>Registered</MenuItem>
                                    </Select>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ComplaintList;
