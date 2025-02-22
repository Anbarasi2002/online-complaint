import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const user = JSON.parse(localStorage.getItem("user"))
   
    const pathd = user?.role === "user" 
  ? "/dashboard" 
  : user?.role === "admin" 
  ? "/admin" 
  : "/police/dashboard";




    const menuItems = [
        { text: 'Home', path: '/' },
        { text:user?user.username: 'Login', path: user?"/": '/login'  },
        { text: 'Register', path: '/register' },
        { text: 'Dashboard', path:pathd },
    ];

    const drawer = (
        <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
            <List>
                {menuItems.map((item) => (
                    <ListItem button key={item.text}  component={Link} to={item.path} >
                        <ListItemText primary={item.text}  />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <AppBar position="static" sx={{ bgcolor: '#1976D2' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleDrawerToggle}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Vehicle Theft Complaints
                    </Typography>
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        {menuItems.map((item) => (
                            <Button key={item.text} component={Link} to={item.path} color="inherit">
                                {item.text}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
                {drawer}
            </Drawer>
        </>
    );
};

export default Navbar;
