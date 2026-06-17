import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import linkService from '../services/linkService';
import AddLinkModal from './AddLinkModal';
import EditLinkModal from './EditLinkModal';
import Sidebar from './Sidebar';
import { Button, Card, Col, Container, Navbar, Row } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [links, setLinks] = useState([]);
  const [username, setUsername] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editLink, setEditLink] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchLinks = async () => {
      const storedUsername = localStorage.getItem('username');
      if (!storedUsername) {
        navigate('/login');
        return;
      }

      setUsername(storedUsername);
      try {
        const response = await linkService.getLinksByUsername(storedUsername);
        setLinks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLinks();
  }, [navigate]);

  const handleLinkAdded = (newLink) => {
    setLinks([...links, newLink]);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const openEditModal = (link) => {
    setEditLink(link);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditLink(null);
  };

  const handleLinkUpdated = (updatedLink) => {
    const updatedLinks = links.map((link) =>
      link._id === updatedLink._id ? updatedLink : link
    );
    setLinks(updatedLinks);
    closeEditModal();
  };

  const handleLinkDeleted = async (linkId) => {
    try {
      await linkService.deleteLink(linkId);
      setLinks(links.filter((link) => link._id !== linkId));
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="dashboard-container" >
      <Navbar bg="light" className="mb-4">
        <Container className="d-flex justify-content-between">
          <Button variant="light" onClick={toggleSidebar} className="hamburger-button">
            <FaBars />
          </Button>
          <Navbar.Brand>My Dashboard</Navbar.Brand>
          <Navbar.Text>
            Welcome, <span className="username">{username}</span>
          </Navbar.Text>
        </Container>
      </Navbar>
      <Container>
        <Button onClick={openAddModal} variant="success" className="add-link-button mb-4">
          Add
        </Button>
        <Row xs={1} md={2} lg={3} className="link-grid">
          {links.length === 0 ? (
            <p><span style={{marginTop:'10px'}}>No links found.</span></p>
          ) : (
            links.map((link) => (
              <Col key={link._id} className="mb-4">
                <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <Card style={{ height: '100%' }}>
                    <div style={{ maxHeight: '200px', overflow: 'hidden' }}>
                      <Card.Img
                        variant="top"
                        src={link.imageLink}
                        alt={link.title}
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      />
                    </div>
                    <Card.Body>
                      <Card.Title>{link.title}</Card.Title>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-between align-items-center">
                      <div>
                        <Button variant="warning" className="edit-btn" onClick={(e) => { e.preventDefault(); openEditModal(link); }}>
                          Edit
                        </Button>
                        <Button variant="danger" className="delete-btn" onClick={(e) => { e.preventDefault(); handleLinkDeleted(link._id); }}>
                          Delete
                        </Button>
                      </div>
                    </Card.Footer>
                  </Card>
                </a>
              </Col>
            ))
          )}
        </Row>
        <AddLinkModal
          isOpen={isAddModalOpen}
          closeModal={closeAddModal}
          username={username}
          onLinkAdded={handleLinkAdded}
        />
        {editLink && (
          <EditLinkModal
            isOpen={isEditModalOpen}
            closeModal={closeEditModal}
            link={editLink}
            onLinkUpdated={handleLinkUpdated}
          />
        )}
      </Container>
      <Sidebar isOpen={isSidebarOpen} closeSidebar={toggleSidebar} onLogout={handleLogout} />
    </div>
  );
};

export default Dashboard;
