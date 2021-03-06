import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv";


import reportPostRoutes from './routes/reportPosts.js';


const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


// Prefix for all reportPosts Routes
app.use('/reportPosts', reportPostRoutes);

app.get('/', (req, res)=> {
    res.send('Hello World');
});


const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => { console.log(`Server running on port: ${PORT}`) }))
    .catch((error) => console.log(error));


mongoose.set('useFindAndModify', false);