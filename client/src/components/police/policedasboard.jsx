import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Box, CssBaseline, Grid, Card, CardContent } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { BarChart } from "@mui/x-charts/BarChart";
import { Link } from "react-router-dom";
import api from "../../config/api";

const PoliceDashboard = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [stats, setStats] = useState({ activeCases: 0, resolvedCases: 0, reports: 0, totalCases: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get("/police/status");
                setStats(response.data);
            } catch (error) {
                console.error("Error fetching police stats:", error);
            }
        };
        fetchStats();
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuItems = [
        { text: "Dashboard", path: "/police/dashboard" },
        { text: "Cases", path: "/police/cases" },
        { text: "Reports", path: "/police/reports" },
        { text: "Logout", path: "/logout" }
    ];

    const drawer = (
        <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
            <List>
                {menuItems.map((item) => (
                    <ListItem button key={item.text} component={Link} to={item.path} sx={{ backgroundColor: item.text === "Logout" ? "red" : "" }}>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ bgcolor: "#1976D2" }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleDrawerToggle}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Police Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
                {drawer}
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ bgcolor: "#673AB7", color: "white", textAlign: "center", p: 2 }}>
                            <CardContent>
                                <Typography variant="h5">Total Cases</Typography>
                                <Typography variant="h6">{stats.totalCases}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ bgcolor: "#FF9800", color: "white", textAlign: "center", p: 2 }}>
                            <CardContent>
                                <Typography variant="h5">Reports</Typography>
                                <Typography variant="h6">{stats.reports}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ bgcolor: "#2196F3", color: "white", textAlign: "center", p: 2 }}>
                            <CardContent>
                                <Typography variant="h5">Active Cases</Typography>
                                <Typography variant="h6">{stats.activeCases}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ bgcolor: "#F44336", color: "white", textAlign: "center", p: 2 }}>
                            <CardContent>
                                <Typography variant="h5">Resolved Cases</Typography>
                                <Typography variant="h6">{stats.resolvedCases}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Bar Chart for Case Status */}
                <Box mt={4} textAlign="center">
                    <Typography variant="h5" gutterBottom>Case Status Chart</Typography>
                    <BarChart
                        width={600}
                        height={300}
                        series={[
                            { data: [stats.activeCases, stats.resolvedCases], label: "Cases", color: "blue" }
                        ]}
                        xAxis={[{ scaleType: "band", data: ["Active Cases", "Resolved Cases"] }]}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default PoliceDashboard;
