import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });


export const fetchReportPostsCoordinates = () => API.get('/reportPosts');
export const fetchReportPost = (id) => API.get('/reportPosts/post/?id=' + id);
export const createReportPosts = (newReportPost) => API.post('/reportPosts', newReportPost)