import { Outlet } from "react-router-dom"
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './Validate_layout.css';
import { NavLink } from 'react-router-dom';
import Footer from "../components/Footer";
import './Layout.css'
import { Navbar, Nav } from 'react-bootstrap';

    const Validate_layout = () => {

  return (


    <div id="page-container">
        <div id="content-wrap">
        
        <Navbar expand="lg" className="custom-navbar">
            <Navbar.Brand>
                <NavLink to="/" className="navbar-brand">Coducation</NavLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink to="." className="nav-link" activeclassname="active">Sign Up</NavLink>
                    <NavLink to="login" className="nav-link" activeclassname="active">Login</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>


      <div className="container my-5">
        <div className="row">
          <div className="col-md-6 photo-section d-flex align-items-center justify-content-center">
            <div className="welcome-text">
            <h1>Welcome to Coducation</h1>
            <p>Begin Your Path to Success</p>
          </div>
              <img src="/Images/index-clipart.png" alt="Platform Image" className="img-fluid" />
          </div>


        <Outlet /> {/* Either Login Form or Sign Up Form */}


        </div>
      </div>
            
        </div>
        <footer id="footer">
            <Footer/>
        </footer>
      </div>

  );
};

export default Validate_layout;


