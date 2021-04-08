import mongoose from 'mongoose';

const reportPostSchema = mongoose.Schema({
    description: { type: String, required: false },
    img: { type: String, required: true },
    coordinates: { type: [Number, Number], required: true },
    createdAt: {
        type: Date,
        default: new Date(),
        required: true
    },
});

const ReportPost = mongoose.model('ReportPost', reportPostSchema);

export default ReportPost;