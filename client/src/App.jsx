// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserRegister from './components/UserRegister';
import UserLogin from './components/UserLogin';
import ComplaintForm from './components/ComplaintForm';
import ComplaintList from './components/ComplaintList';
import ComplaintDetails from './components/ComplaintDetails';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={UserLogin} />
        <Route path="/register" component={UserRegister} />
        <Route path="/complaint" component={ComplaintForm} />
        <Route path="/complaints" component={ComplaintList} />
        <Route path="/complaints/:id" component={ComplaintDetails} />
        <Route path="/admin" component={AdminDashboard} />
      </Switch>
    </Router>
  );
}

export default App;
