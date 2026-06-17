import React, { useState } from 'react';
import Modal from 'react-modal';
import linkService from '../services/linkService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './EditLinkModal.css';
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
    maxHeight: '83vh',
    overflow: 'auto',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    padding: '30px'
  }
};

const EditLinkModal = ({ isOpen, closeModal, link, onLinkUpdated }) => {
  const [title, setTitle] = useState(link.title);
  const [description, setDescription] = useState(link.description);
  const [imageLink, setimageLink] = useState(link.imageLink);
  const [url, setUrl] = useState(link.url);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedLink = {
        ...link,
        title,
        description,
        imageLink: imageLink,
        url,
      };
      const response = await linkService.updateLink(link._id, updatedLink);
      onLinkUpdated(response.data);
      closeModal();
    } catch (error) {
      console.error('Error updating link:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Edit Link Modal"
    >
      <div style={{ justifyContent: 'space-between', textAlign: 'right'}}>
      <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer',}}>
      <FontAwesomeIcon icon={faTimes} style={{ fontSize: '24px', color: '#333' ,}} />
          <i className="fas fa-times"></i>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
      <div >
            <style>
                {`
                    .centered-image {
                        display: block;
                        margin-left: auto;
                        margin-right: auto;
                        width: 150px; /* Set the desired width */
                        height: 130px; /* Set the desired height */
                        border-radius: 25px;
                    }
                `}
            </style>
            <img src={link.imageLink} alt={link.title} className="centered-image"  style={{marginBottom: '20px'}} />
        </div>
        <div className="form-group" style={{ textAlign: 'Left'}}>
        <label>
  <span style={{ font: 'Poppins',fontVariant: 'normal',fontWeight:'bold'}}>Title</span>
</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
        <label>
  <span style={{ font: 'Poppins',fontVariant: 'normal',fontWeight:'bold'}}>Description</span>
</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
        <label>
  <span style={{ font: 'Poppins',fontVariant: 'normal',fontWeight:'bold'}}>Image</span>
</label>
          <input
            type="text"
            value={imageLink}
            onChange={(e) => setimageLink(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
        <label>
  <span style={{ font: 'Poppins',fontVariant: 'normal',fontWeight:'bold'}}>Link</span>
</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div>
  <button className="button button2 buttonn" type="submit">
  <span style={{ font: 'Poppins',fontVariant: 'normal',fontWeight:'bold'}}>Update</span>
  </button>
</div>
      </form>
    </Modal>
  );
};

export default EditLinkModal;
