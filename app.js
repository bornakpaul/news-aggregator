import env from 'dotenv';
env.config();

import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './database/main.js';
import authRoutes from './routes/auth.js';
import prefsRoutes from "./routes/prefs.js";
import newsRoutes from "./routes/news.js";

// defining port
const app = express();
const port = process.env.PORT || 3001;

// db connection
connectDB();

// middlewares
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/', authRoutes);
app.use('/', prefsRoutes);
app.use('/', newsRoutes);

// connections
app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});