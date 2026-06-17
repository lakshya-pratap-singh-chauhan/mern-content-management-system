// linkService.js

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/links/';

const addLink = (linkData) => {
  const username = localStorage.getItem('username');
  linkData = { ...linkData, username };
  return axios.post(API_URL, linkData);
};

const getLinksByUsername = (username) => {
  return axios.get(`${API_URL}user/${username}`);
};

const updateLink = (linkId, updatedLink) => {
  return axios.put(`${API_URL}${linkId}`, updatedLink);
};

const deleteLink = async (linkId) => {
  return axios.delete(`${API_URL}${linkId}`);
};

const getLinks = () => {
  return axios.get(API_URL);
};

export default {
  addLink,
  getLinksByUsername,
  updateLink,
  deleteLink,
  getLinks,
};
