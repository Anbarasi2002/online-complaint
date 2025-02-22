import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PoliceRegister from './components/police/Register';
import AdminRegister from './components/admin/Register';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard';
import ComplaintList from './components/admin/ComplaintList';
import UserList from './components/admin/userlist';
import UserDashboard from './components/userDashboard';
import PoliceDashboard from './components/police/policedasboard';
import CaseList from './components/police/cases';
import CaseDetails from './components/police/casedetails';
import HomePage from './components/home';

function App() {
    return (

        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<UserDashboard/>} />
                <Route path="/complaints" element={<h1>complaints</h1>} />
                <Route path="/complaints/:id" element={<h1>complaint details</h1>} />
                {/* admin routes*/}
                <Route path="/admin" element={<AdminDashboard/>} />
                <Route path="/admin/admins" element={<UserList/>} />
                
                <Route path="/admin/register" element={<AdminRegister />} />
                <Route path="/admin/complaints" element={<ComplaintList/>} />
                <Route path="/admin/complaints/:id" element={<h1>admin complaint details</h1>} />
                {/* police */}
                <Route path="/police/dashboard" element={<PoliceDashboard/>} />
                <Route path="/police/register" element={<PoliceRegister />} />
                <Route path="/police/cases" element={<CaseList/>} />
                <Route path="/cases/:id" element={<CaseDetails/>} />

                {/* /cases/67b8a42e535e9e2a9863de49 */}

            </Routes>
        </Router>

    );
}

export default App;
