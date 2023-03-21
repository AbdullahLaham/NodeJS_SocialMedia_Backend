
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import UploadRoute from './Routes/UploadRoute.js';
import MessageRoute from './Routes/MessageRoute.js'
import ChatRoute from './Routes/ChatRoute.js';

import cors from 'cors';
// Routes
const app = express();

// to serve images for public
app.use(express.static('public'));
app.use('/images', express.static("images"));


dotenv.config();
app.use(bodyParser.json({"limit": "30mb", extended: true})); // 30mb because we will send images
app.use(bodyParser.urlencoded({"limit": "30mb", extended: true}));
app.use(cors());
// usage of routes
app.get('/', (req, res) => res.send('app is running'));
app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.use('/upload', UploadRoute);
app.use('/chat', ChatRoute);
app.use('/messages', MessageRoute)

mongoose.connect("mongodb+srv://abdullah:0G4X35ZgyRkI8SXl@cluster0.4wz1lff.mongodb.net/?retryWrites=true&w=majority",  {useNewUrlParser: true, useUnifiedTopology: true,})
.then((res) => app.listen(process.env.PORT, () => {
    console.log(`app is listening on port ${process.env.PORT}`);
}))
.catch((error) => console.log(error));

