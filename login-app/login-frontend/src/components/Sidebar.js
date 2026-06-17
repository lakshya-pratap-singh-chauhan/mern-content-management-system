import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, closeSidebar, onLogout }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <Button variant="secondary" onClick={closeSidebar} className="close-sidebar-button">
        &times;
      </Button>
      <div className="sidebar-content">
        <ul className="sidebar-list">
          <li className="sidebar-list-item" >
            <Link to="/profile" onClick={closeSidebar}>Profile</Link>
          </li>
          <li className="sidebar-list-item">
            <Link to="/dashboard" onClick={closeSidebar}>Dashboard</Link>
          </li>
        </ul>
      </div>
      <Button variant="danger" onClick={onLogout} className="logout-button">
        Logout
      </Button>
    </div>
  );
};

export default Sidebar;
