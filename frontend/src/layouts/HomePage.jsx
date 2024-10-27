import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../components/Navbar";
import Header from "../components/home/Header";
import Hero from "../components/home/Hero";
import Mission from "../components/home/Mission";
import Features from "../components/home/Features";
import Action from "../components/home/Action";
import Footer from "../components/Footer";
import './Layout.css'
const HomePage = () => {
    return (

        <div id="page-container">
            <Navbar />
        <div id="content-wrap">
            <Header />
            <Mission />
            <Action />
            <Hero />
        </div>
        <footer id="footer">
            <Footer/>
        </footer>
      </div>

    )
}

export default HomePage;