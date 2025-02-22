import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemText, Typography, Card, CardContent, Divider } from '@mui/material';
import ComplaintDetails from './ComplaintDetails';
import ComplaintForm from './ComplaintForm';
import MyComplaintlist from './mycomplaintlist';
import MyDashboard from './mydashboard';

const UserDashboard = () => {
    const [selectedSection, setSelectedSection] = useState('My Complaints');

    const renderContent = () => {
        switch (selectedSection) {
            case 'My Complaints':
                return (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
                        <Card sx={{ width: '80%', boxShadow: 4, borderRadius: 3, transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976D2' }}>
                                    My Complaints
                                </Typography>
                                <ComplaintDetails />
                            </CardContent>
                        </Card>
                    </Box>
                );
            case 'All Complaints':
                return <Typography variant="h5" sx={{ mt: 3, color: '#1976D2', fontWeight: 'bold' }}><MyComplaintlist/></Typography>;
            case 'Add Complaint':
                return <ComplaintForm />;
            case "Dashboard":
                return <MyDashboard/>
            default:
                return <ComplaintDetails />;
        }
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#F4F6F8' }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: 260,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': { width: 260, boxSizing: 'border-box', backgroundColor: '#1976D2', color: 'white' },
                }}
            >
                <Typography variant="h6" sx={{ p: 2, textAlign: 'center', fontWeight: 'bold', letterSpacing: 1 }}>
                    User Dashboard
                </Typography>
                <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }} />
                <List>
                    {['My Complaints', 'All Complaints', 'Add Complaint',"Dashboard"].map((text) => (
                        <ListItem
                            button
                            key={text}
                            onClick={() => setSelectedSection(text)}
                            sx={{
                                transition: '0.3s',
                                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
                                backgroundColor: selectedSection === text ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                            }}
                        >
                            <ListItemText primary={text} sx={{ textAlign: 'center', fontWeight: 'bold' }} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box sx={{ flexGrow: 1, p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {renderContent()}
            </Box>
        </Box>
    );
};

export default UserDashboard;
