import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Grid, CircularProgress, Chip } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import api from "../config/api";

const MyDashboard = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));
    const id = user.id;

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await api.get(`/complaints/${id}`);
                setComplaints(response.data);
            } catch (err) {
                setError("Error fetching complaints data");
            } finally {
                setLoading(false);
            }
        };

        fetchComplaints();
    }, [id]);

    if (loading) return <Box textAlign="center" mt={4}><CircularProgress /></Box>;
    if (error) return <Typography color="error">{error}</Typography>;

    // Complaint counts based on ENUM
    const totalComplaints = complaints.length;
    const registeredComplaints = complaints.filter(c => c.status === "Registered").length;
    const inProgressComplaints = complaints.filter(c => c.status === "Under Investigation").length;
    const resolvedComplaints = complaints.filter(c => c.status === "Resolved").length;

    // Function to get status color
    const getStatusColor = (status) => {
        switch (status) {
            case "Registered":
                return "warning";  // Yellow
            case "Under Investigation":
                return "primary";  // Blue
            case "Resolved":
                return "success";  // Green
            default:
                return "default";
        }
    };

    return (
        <Box sx={{ maxWidth: 900, mx: "auto", mt: 5, p: 2 }}>
            <Typography variant="h4" gutterBottom align="center">User Dashboard</Typography>

            {/* Complaint Statistics */}
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={4}>
                    <Card sx={{ textAlign: "center", p: 2, bgcolor: "primary.light" }}>
                        <CardContent>
                            <Typography variant="h6">Total Complaints</Typography>
                            <Typography variant="h4">{totalComplaints}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Card sx={{ textAlign: "center", p: 2, bgcolor: "success.light" }}>
                        <CardContent>
                            <Typography variant="h6">Resolved Complaints</Typography>
                            <Typography variant="h4">{resolvedComplaints}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Complaint Status Chart */}
            <Box mt={4} textAlign="center">
                <Typography variant="h5" gutterBottom>Complaint Status Chart</Typography>
                <BarChart
                    width={600}
                    height={300}
                    series={[
                        { data: [registeredComplaints, inProgressComplaints, resolvedComplaints], label: "Complaints", color: "blue" }
                    ]}
                    xAxis={[{ scaleType: "band", data: ["Registered", "Under Investigation", "Resolved"] }]}
                />
            </Box>

            {/* Status Summary with Colors */}
            <Box mt={4}>
                <Typography variant="h5" align="center" gutterBottom>Status Overview</Typography>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={4} textAlign="center">
                        <Chip label="Registered" color={getStatusColor("Registered")} sx={{ fontSize: 16, p: 1.5, width: "100%" }} />
                    </Grid>
                    <Grid item xs={4} textAlign="center">
                        <Chip label="Under Investigation" color={getStatusColor("Under Investigation")} sx={{ fontSize: 16, p: 1.5, width: "100%" }} />
                    </Grid>
                    <Grid item xs={4} textAlign="center">
                        <Chip label="Resolved" color={getStatusColor("Resolved")} sx={{ fontSize: 16, p: 1.5, width: "100%" }} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default MyDashboard;
