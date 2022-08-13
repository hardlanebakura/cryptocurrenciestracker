import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div id='navbar-container'>
        <div id="navbar">
            <div className="navbar-item">
                <Link to ="/">Rankings</Link>
            </div>
            <div className="navbar-item">
                <Link to = "/charts">Charts</Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar