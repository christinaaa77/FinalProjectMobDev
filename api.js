import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Sesuaikan dengan URL JSON Server Anda

export const getUsers = () => axios.get(`${API_URL}/users`);

export const addUser = (user) => axios.post(`${API_URL}/users`, user);

export const getPhotos = () => axios.get(`${API_URL}/photos`);

export const addPhoto = (photo) => axios.post(`${API_URL}/photos`, photo);
