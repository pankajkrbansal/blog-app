import express from 'express'
import dotenv from 'dotenv'

const app = express();

dotenv.config();

app.listen(process.env.SERVER_PORT, () => {
    console.log("App @ 3000");
})