import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
// for .env
dotenv.config()
//cross-origin. cors must be above routes!
app.use(cors());

//limit to 30mb, for images. setting up body parser for requests
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))


app.use('/posts', postRoutes)
//switch to .env string before deployment. specifies database name -- replace "Etch" 

// for signin/signup
app.use('/user', userRoutes)

// for hosting, just to know server is running
app.get('/', (req, res) => {
    res.send('Etch app is running.')
})

const PORT = process.env.PORT || 5500;

//useNewURLParser and useUnifiedTopology deprecated
mongoose.connect(process.env.CONNECTION_URL)
    .then(()=>app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`)))
    .catch((error)=>console.log(error.message))

