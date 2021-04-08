import mongoose from 'mongoose';
import ReportPost from '../models/reportPosts.js';


export const getReportPosts = async (req, res) => {
    try {

        res.status(200).json({ testMessage: 'getReportPosts Response' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createReportPosts = async (req, res) => {
    const post = req.body;
    console.log("create Report Post");

    // console.log("Post: ", post);
    const newReport = new ReportPost({ ...post, createdAt: new Date().toISOString() });
    try {
        await newReport.save();

        res.status(201).json(newReport);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}