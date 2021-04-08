import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });


// Funktion wird bei jedem Request ausgefürht, also vor allen anderen requests (fügt Token in header request zu, später für auth routes) 
// API.interceptors.request.use((req) => {
//     if (localStorage.getItem('profile')) {
//         req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//     }
//     return req;
// });

export const fetchReportPosts = () => API.get('/reportPosts');
export const createReportPosts = (newReportPost) => API.post('/reportPosts', newReportPost)