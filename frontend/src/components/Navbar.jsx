import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import './Navbar.css';
import { AuthContext } from '../AuthContext';

const CustomNavbar = () => {
    const { isAuthenticated, userInfo, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout(); 
    };

    const renderAuthLinks = () => {
        if (isAuthenticated && userInfo) {
            return (
                <NavDropdown title={userInfo.fullName} id="basic-nav-dropdown">
                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
            );
        } else {
            return <NavLink to="/validate/login" className="nav-link">Login</NavLink>;
        }
    };

    return (
        <Navbar id='navbar' expand="lg" className="custom-navbar">
            <Navbar.Brand>
                <NavLink to="/" className="navbar-brand">Coducation</NavLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink to="/" className="nav-link" activeclassname="active">Home</NavLink>
                    <NavLink to="/paths" className="nav-link" activeclassname="active">Paths</NavLink>
                    {/* <NavLink to="/courses" className="nav-link" activeclassname="active">Courses</NavLink> */}
                    {/* <NavLink to="/my_classes" className="nav-link" activeclassname="active">My Classes</NavLink> */}
                    {/* <NavLink to="/chats" className="nav-link" activeclassname="active">Chats</NavLink> */}
                </Nav>
                <Nav className="ml-auto">
                    {renderAuthLinks()}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default CustomNavbar;
