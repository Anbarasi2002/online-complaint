import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
import api from '../../config/api';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/admin/users');
                setUsers(response.data);
            } catch (err) {
                setError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const getRoleStyles = (role) => {
        switch (role) {
            case 'admin': return { color: '#fff', backgroundColor: '#d32f2f' }; // Red
            case 'police': return { color: '#fff', backgroundColor: '#1976d2' }; // Blue
            case 'user': return { color: '#fff', backgroundColor: '#388e3c' }; // Green
            default: return { color: '#000', backgroundColor: '#bdbdbd' }; // Gray
        }
    };

    if (loading) {
        return <div>Loading users...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>User List</Typography>
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell><strong>Username</strong></TableCell>
                            <TableCell><strong>Email</strong></TableCell>
                            <TableCell><strong>Role</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user._id} hover>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Chip 
                                        label={user.role.charAt(0).toUpperCase() + user.role.slice(1)} 
                                        sx={{ ...getRoleStyles(user.role), fontWeight: 'bold', borderRadius: 1 }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default UserList;
