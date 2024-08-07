import axios from 'axios';

const api = axios.create({
  baseURL: process.env.apiurl,
});

export default api;
