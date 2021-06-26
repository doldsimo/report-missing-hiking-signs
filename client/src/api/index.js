import axios from 'axios';

// const API = axios.create({ baseURL: 'http://localhost:5000' });

// if backend is running in the same network
// const API = axios.create({ baseURL: 'http://yourIP:5000' });
const API = axios.create({ baseURL: 'http://192.168.2.113:5000' });


export const fetchReportPostsCoordinates = () => API.get('/reportPosts');
export const fetchReportPost = (id) => API.get('/reportPosts/post/?id=' + id);
export const createReportPosts = (newReportPost) => API.post('/reportPosts', newReportPost);