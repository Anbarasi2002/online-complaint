import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="home-container">
                <h1>Welcome to the Vehicle Theft Online Complaints App</h1>
                <p>
                    This platform allows you to report vehicle thefts conveniently and efficiently.
                </p>
                <p>
                    If you have experienced a vehicle theft, please <Link to="/register">register a complaint</Link>.
                </p>
                <p>
                    For more information on how to recover your stolen vehicle, visit our <Link to="/vehicle-recovery-tips">Vehicle Recovery Tips</Link> page.
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default Home;