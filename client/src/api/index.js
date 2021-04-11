import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });


export const fetchReportPosts = () => API.get('/reportPosts');
export const createReportPosts = (newReportPost) => API.post('/reportPosts', newReportPost)