import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Typography, TextField, Button, Alert, MenuItem } from '@mui/material';
import { url } from '../../config/config';

const PoliceRegister = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default role
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(url+'/api/auth/register', {
                username,
                email,
                password,
                role,
            });
            
            if (response.data) {
                navigate('/login'); // Redirect to login after successful registration
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Card sx={{ p: 4, boxShadow: 3, borderRadius: 2, width: '100%' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Admin Register
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <TextField
                        select
                        label="Role"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <MenuItem value="police">Police</MenuItem>
                     
                    </TextField>
                    <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
                        Register
                    </Button>
                </form>
            </Card>
        </Container>
    );
};

export default PoliceRegister;
