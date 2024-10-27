import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Paths_hero from '../components/paths/paths_hero';
import Paths_list from '../components/paths/Paths_list';
import './Layout.css';

const Paths_layout = () => {
  return (
    <div id="page-container">
      <Navbar />
      <div id="content-wrap">
                
        <Paths_hero />
        <Paths_list />

      </div>
      <footer id="footer">
        <Footer />
      </footer>
    </div>
  );
}

export default Paths_layout;
