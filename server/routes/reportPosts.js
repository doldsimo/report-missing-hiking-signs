import express from 'express';

import { getReportPostsCoordinates, createReportPosts, getReportPost } from '../controllers/reportPosts.js';


const router = express.Router();

// !!! There is a prefix in index.js url -> localhost:5000/reportPosts/
router.get('/', getReportPostsCoordinates);
router.get('/post', getReportPost);
router.post('/', createReportPosts);


export default router;