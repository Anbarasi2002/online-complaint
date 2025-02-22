import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Box, Button, CssBaseline, Grid, Card, CardContent } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuItems = [
        { text: 'Dashboard', path: '/admin' },
        { text: 'User List', path: '/admin/admins' },
        { text: 'Reports', path: '/admin/reports' },
        { text: 'Complaints List', path: '/admin/complaints' },
        { text: 'Logout', path: '/logout' }
    ];

    const drawer = (
        <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
            <List>
                {menuItems.map((item) => (
                    <ListItem button key={item.text} component={Link} to={item.path} sx={{ backgroundColor: item.text === 'Logout' ? 'red' : '' }}>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ bgcolor: '#1976D2' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleDrawerToggle}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Admin Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
                {drawer}
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ bgcolor: '#4caf50', color: 'white' }}>
                            <CardContent>
                                <Typography variant="h5">Admins</Typography>
                                <Typography variant="h6">10</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ bgcolor: '#ff9800', color: 'white' }}>
                            <CardContent>
                                <Typography variant="h5">Reports</Typography>
                                <Typography variant="h6">45</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ bgcolor: '#2196f3', color: 'white' }}>
                            <CardContent>
                                <Typography variant="h5">Active Cases</Typography>
                                <Typography variant="h6">20</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ bgcolor: '#f44336', color: 'white' }}>
                            <CardContent>
                                <Typography variant="h5">Resolved Cases</Typography>
                                <Typography variant="h6">75</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default AdminDashboard;
