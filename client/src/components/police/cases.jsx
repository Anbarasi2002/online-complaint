import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, Select, Avatar, Button, styled } from '@mui/material';
import api from '../../config/api';

const CaseList = () => {
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const StyledButton = styled(Button)({
        background: "linear-gradient(45deg, #1976D2, #64B5F6)", // Gradient blue
        border: 0,
        borderRadius: 8,
        color: "white",
        padding: "8px 20px",
        fontWeight: "bold",
        transition: "0.3s",
        "&:hover": {
          background: "linear-gradient(45deg, #1565C0, #42A5F5)", // Darker on hover
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        },
      });

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const response = await api.get('/complaints'); // Adjust the endpoint as necessary
                setCases(response.data);
            } catch (err) {
                setError('Failed to fetch cases');
            } finally {
                setLoading(false);
            }
        };

        fetchCases();
    }, []);

    const handleRowClick = (id) => {
        navigate(`/cases/${id}`);
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await api.put(`/complaints/${id}/status`, { status: newStatus });
            setCases(cases.map(caseItem => 
                caseItem._id === id ? { ...caseItem, status: newStatus } : caseItem
            ));
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    if (loading) return <div>Loading cases...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Case List</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Image</strong></TableCell>
                            <TableCell><strong>Vehicle</strong></TableCell>
                            <TableCell><strong>Theft Date</strong></TableCell>
                            <TableCell><strong>Location</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell><strong>view</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cases.map(caseItem => (
                            <TableRow 
                                key={caseItem._id} 
                              
                                sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
                            >
                                <TableCell>
                                   
                                    <Avatar 
                                        src={"http://localhost:5000/"+caseItem.vehicleImage || 'https://via.placeholder.com/100'} 
                                        alt="Vehicle Image"
                                        sx={{ width: 50, height: 50 }}
                                    />
                                </TableCell>
                                <TableCell>{caseItem.vehicleDetails.make} {caseItem.vehicleDetails.model}</TableCell>
                                <TableCell>{new Date(caseItem.theftDate).toLocaleDateString()}</TableCell>
                                <TableCell>{caseItem.location}</TableCell>
                                <TableCell>
                                    <Select
                                        value={caseItem.status}
                                        onChange={(e) => handleStatusChange(caseItem._id, e.target.value)}
                                        sx={{ fontWeight: 'bold', borderRadius: 1, p: 1 }}
                                    >
                                        <MenuItem value="Pending">Pending</MenuItem>
                                        <MenuItem value="Under Investigation">Under Investigation</MenuItem>
                                        <MenuItem value="Resolved">Resolved</MenuItem>
                                        <MenuItem value="Registered">Registered</MenuItem>
                                    </Select>
                                </TableCell>
                                <TableCell><StyledButton   onClick={() => handleRowClick(caseItem._id)} >view</StyledButton></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default CaseList;