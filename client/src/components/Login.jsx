import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Typography, TextField, Button, Alert } from '@mui/material';

import axios from 'axios';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();



const API_BASE_URL = 'http://localhost:5000/api/auth'

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, {
                email,password
            });
        
            console.log(response.data);

        const token = response.data.token; // Ensure backend sends token
        console.log("Token:", token);
        
        // Save token in localStorage or sessionStorage
        localStorage.setItem("token", token); 
        localStorage.setItem("user",JSON.stringify(response.data.user))

       
        if ( response.data.user.role==="user") {
            
            navigate('/dashboard');
        }else if ( response.data.user.role==="admin"){
               navigate("/admin")
        }else{
             navigate("/police/dashboard")
        }
     

           
        } catch (err) {
            console.log(err);
            
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Card sx={{ p: 4, boxShadow: 3, borderRadius: 2, width: '100%' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit}>
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
                    <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
                        Login
                    </Button>
                </form>
            </Card>
        </Container>
    );
};

export default Login;
