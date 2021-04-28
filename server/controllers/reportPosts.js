import mongoose from 'mongoose';
import ReportPost from '../models/reportPosts.js';


export const getReportPostsCoordinates = async (req, res) => {
    try {
        const reportPostsCoordinates = await ReportPost.find({}, { id: 0, img: 0, description: 0, createdAt: 0 });

        res.status(200).json(reportPostsCoordinates);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getReportPost = async (req, res) => {

    const postId = req.query.id;
    try {
        // Get Post
        const reportPost = await ReportPost.findById(postId);

        // console.log(reportPost);

        // console.log("reportPost: " + reportPost);

        res.status(200).json(reportPost);

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