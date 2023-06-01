import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProtectedRoute from './ProtectedRoute';

import Home from './pages/Landing_Page/Home';
import Services from './pages/Landing_Page/Services';
import About from './pages/Landing_Page/About';
import Technology from './pages/Landing_Page/Technology';
import Login from './pages/Landing_Page/Login';
import Register from './pages/Landing_Page/Register';

import AdminDashboard from './pages/Dashboard/AdminDashboard';
import PatientDashboard from './pages/Dashboard/PatientDashboard';
import DoctorDashboard from './pages/Dashboard/DoctorDashboard';
import TechnicianDashboard from './pages/Dashboard/TechnicianDashboard';

import Navbar from './components/navbar.component';

function App() {

  const checkRole = (allowedRoles, component) => {

    const data = localStorage.getItem('user');

    if (data) {
      const obj = JSON.parse(data);
      const userRole = obj.role;
      console.log(userRole);
 
      if (allowedRoles.includes(userRole)) {
        return component;
      }else{
        console.log(allowedRoles, userRole);
        return <Navigate to="/home" />;
      }
    }

    
  };

  return (
    <div className="font-jost text-sky-800">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <ProtectedRoute path="/patient" component={<PatientDashboard />} auth={true}/>
          <Route
            path="/admin"
            element={checkRole(['admin'], <AdminDashboard />)}
          />
          <Route
            path="/doctor"
            element={checkRole(['doctor'], <DoctorDashboard />)}
          />
          <Route
            path="/technician"
            element={checkRole(['technician'], <TechnicianDashboard />)}
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
