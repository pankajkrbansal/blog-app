import express from 'express'
import dotenv from 'dotenv'

import router from './routes/userRoutes.js';
import errorLogger from './utilities/errorLogger.js';
dotenv.config();

const app = express();

app.use('/api/users', router);

// error-logger
app.use(errorLogger);

app.listen(process.env.SERVER_PORT, () => {
    console.log("App @ 3000");
})