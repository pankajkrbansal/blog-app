import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

import router from './routes/userRoutes.js';
import errorLogger from './utilities/errorLogger.js';
import connection from './utilities/connection.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// calling connectDB to connect with mongodb
await connection.connectDB();

app.use('/api/users', router);


// error-logger
app.use(errorLogger);

app.listen(process.env.SERVER_PORT, () => {
    console.log("App @ 3000");
})