import mongoose from 'mongoose';
import ReportPost from '../models/reportPosts.js';


export const getReportPosts = async (req, res) => {
    try {

        res.status(200).json({testMessage: 'getReportPosts Response'});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createReportPosts = async (req, res) => {


    try {

        res.status(201).json({testMessage: 'createReportPosts Response'});
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}