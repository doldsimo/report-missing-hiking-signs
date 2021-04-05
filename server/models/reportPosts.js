import mongoose from 'mongoose';

const reportPostSchema = mongoose.Schema({
    description: String,
    image: String,
    coordinates: { type: [Number, Number], required: true },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const ReportPost = mongoose.model('ReportPost', reportPostSchema);

export default ReportPost;