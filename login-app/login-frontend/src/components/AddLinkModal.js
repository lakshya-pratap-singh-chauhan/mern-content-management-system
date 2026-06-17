import React, { useState } from 'react';
import Modal from 'react-modal';
import linkService from '../services/linkService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    maxWidth: '600px',
    width: '80%',
    maxHeight: '80vh',
    overflow: 'auto',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    padding: '30px'
  }
};

const AddLinkModal = ({ isOpen, closeModal, username, onLinkAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageLink, setimageLink] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newLink = {
        title,
        description,
        imageLink,
        url,
        username,
      };
      const response = await linkService.addLink(newLink);
      onLinkAdded(response.data); // Pass newly added link back to Dashboard for update
      closeModal(); // Close modal after successful addition
      // Clear form inputs
      setTitle('');
      setDescription('');
      setimageLink('');
      setUrl('');
    } catch (error) {
      console.error('Error adding link:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Add Link Modal"
    >
      <div style={{ justifyContent: 'space-between', textAlign: 'right'}}>
      <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer',}}>
      <FontAwesomeIcon icon={faTimes} style={{ fontSize: '24px', color: '#333' ,}} />
          <i className="fas fa-times"></i>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label><span style={{ font: 'Poppins',fontVariant: 'normal',fontWeight:'bold'}}>Title</span></label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
        <label><span style={{ font: 'Poppins',fontVariant: 'normal',fontWeight:'bold'}}>Description</span></label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
        <label><span style={{ font: 'Poppins',fontVariant: 'normal',fontWeight:'bold'}}>Image</span></label>
          <input
            type="text"
            value={imageLink}
            onChange={(e) => setimageLink(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
        <label><span style={{ font: 'Poppins',fontVariant: 'normal',fontWeight:'bold'}}>Link</span></label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <button className="button button2 buttonn" type="submit">
  <span style={{ font: 'Poppins',fontVariant: 'normal',fontWeight:'bold'}}>Submit</span>
  </button>
      </form>
    </Modal>
  );
};

export default AddLinkModal;
