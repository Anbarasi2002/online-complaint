import React from "react";
import { Box, Typography, Grid, Card, CardContent, Button, Paper } from "@mui/material";
import { DirectionsCar, GppGood, LocalPolice, Insights, ReportProblem, Phone, Newspaper } from "@mui/icons-material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";

const StatCard = styled(Card)(({ theme }) => ({
  background: "linear-gradient(135deg, #ff8a65, #ff7043)",
  color: "white",
  padding: "20px",
  textAlign: "center",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  "&:hover": { transform: "scale(1.05)", transition: "0.3s" },
}));

const Section = styled(Box)({
  padding: "50px 20px",
  textAlign: "center",
});

const MotionIcon = styled(motion.div)({
  display: "inline-block",
  fontSize: "3rem",
  marginBottom: "10px",
});

const HomePage = () => {
  return (
    <Box sx={{ background: "#F5F5F5", minHeight: "100vh", overflowX: "hidden" }}>
      
      {/* 🚗 Section 1: Vehicle Theft Statistics */}
      <Section>
        <Typography variant="h4" gutterBottom color="primary">🚔 Vehicle Theft Statistics</Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <StatCard>
              <MotionIcon whileHover={{ rotate: 10 }} whileTap={{ scale: 0.9 }}>
                <LocalPolice fontSize="large" />
              </MotionIcon>
              <Typography variant="h6">Total Reported Cases</Typography>
              <Typography variant="h4" fontWeight="bold">12,345</Typography>
            </StatCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard>
              <MotionIcon whileHover={{ rotate: -10 }} whileTap={{ scale: 0.9 }}>
                <DirectionsCar fontSize="large" />
              </MotionIcon>
              <Typography variant="h6">Vehicles Recovered</Typography>
              <Typography variant="h4" fontWeight="bold">8,765</Typography>
            </StatCard>
          </Grid>
        </Grid>
      </Section>

      {/* 🛠️ Section 2: Vehicle Recovery Tips */}
      <Section sx={{ background: "#E3F2FD" }}>
        <Typography variant="h4" gutterBottom color="secondary">🔍 Vehicle Recovery Tips</Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <StatCard>
              <Insights fontSize="large" />
              <Typography variant="h6">Install GPS Tracker</Typography>
              <Typography variant="body2">A GPS tracker helps authorities locate stolen vehicles faster.</Typography>
            </StatCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard>
              <LocalPolice fontSize="large" />
              <Typography variant="h6">Report Theft Immediately</Typography>
              <Typography variant="body2">Contact your nearest police station and file an FIR without delay.</Typography>
            </StatCard>
          </Grid>
        </Grid>
      </Section>

      {/* 📋 Section 3: How to Report a Stolen Vehicle */}
      <Section>
        <Typography variant="h4" gutterBottom color="primary">📋 How to Report a Stolen Vehicle</Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Paper elevation={4} sx={{ p: 3, textAlign: "left" }}>
              <Typography variant="h6">Step 1: Gather Information</Typography>
              <Typography variant="body2">Prepare details like vehicle number, model, color, and last seen location.</Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>Step 2: File an FIR</Typography>
              <Typography variant="body2">Visit your nearest police station and report the theft.</Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>Step 3: Inform Your Insurance Company</Typography>
              <Typography variant="body2">Submit the FIR copy to your insurance provider for claims.</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Section>

      {/* 🏆 Section 4: Success Stories */}
      <Section sx={{ background: "#FFF3E0" }}>
        <Typography variant="h4" gutterBottom color="secondary">🏆 Success Stories</Typography>
        <Typography variant="body1">
          "My stolen car was found within a week thanks to RTO's fast tracking!" - <b>Rajesh, Chennai</b>
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          "I recovered my bike with GPS tracking advice. Thank you RTO!" - <b>Sneha, Bangalore</b>
        </Typography>
      </Section>

      {/* 🚨 Section 5: Latest News & Alerts */}
      <Section>
        <Typography variant="h4" gutterBottom color="primary">🚨 Latest News & Alerts</Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Newspaper fontSize="large" />
              <Typography variant="h6">🔴 Increase in Vehicle Thefts</Typography>
              <Typography variant="body2">Cases increased by 12% this year. Stay alert!</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Newspaper fontSize="large" />
              <Typography variant="h6">🟢 500+ Vehicles Recovered</Typography>
              <Typography variant="body2">RTO and police have recovered over 500 stolen vehicles.</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Section>

      {/* 📞 Section 6: Contact & Helpline */}
      <Section sx={{ background: "#E0F7FA" }}>
        <Typography variant="h4" gutterBottom color="secondary">📞 Emergency Contact</Typography>
        <Typography variant="h6">🚔 Police Helpline: 100</Typography>
        <Typography variant="h6">📞 RTO Helpdesk: 1800-123-4567</Typography>
        <Button variant="contained" color="primary" startIcon={<Phone />}>Call Now</Button>
      </Section>
    </Box>
  );
};

export default HomePage;
