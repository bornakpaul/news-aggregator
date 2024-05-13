import env from 'dotenv';
env.config();

import express from 'express';
import connectDB from './database/main.js';
import authRoutes from './routes/auth.js';

// defining port
const app = express();
const port = process.env.PORT || 3001;

// db connection
connectDB();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/auth', authRoutes);

// connections
app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});