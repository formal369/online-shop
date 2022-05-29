import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Auth from '../hoc/auth';
import NavBar from "./views/NavBar/NavBar";

import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import UploadProductPage from './views/UploadProductPage/UploadProductPage';


function App() {
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);
  const AuthUploadProductPage = Auth(UploadProductPage, true);
  
  return (
    <>
    <NavBar />
      <Router>
        <Routes>
          <Route exact path="/" element={<AuthLandingPage />} />
          <Route exact path="/login" element={<AuthLoginPage />} />
          <Route exact path="/register" element={<AuthRegisterPage />} />
          <Route exact path="/product/upload" element={<AuthUploadProductPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
