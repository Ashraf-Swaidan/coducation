import React from 'react'
import Navbar from "../components/Navbar"; 
import Footer from '../components/Footer';
const Classes_layout = () => {
  return (
    <div id="page-container">
        <div id="content-wrap">
         
            <Navbar />
            My classes Layout

        </div>
        <footer id="footer">
            <Footer/>
        </footer>
      </div>
  )
}

export default Classes_layout

