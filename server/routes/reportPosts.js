import express from 'express';

import { getReportPosts, createReportPosts } from '../controllers/reportPosts.js';


const router = express.Router();

// !!! There is a prefix in index.js url -> localhost:5000/reportPosts/
router.get('/', getReportPosts);
router.post('/', createReportPosts);


export default router;