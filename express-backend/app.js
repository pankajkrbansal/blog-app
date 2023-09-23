const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const router = require("./routes/userRoutes.js");
const errorLogger = require("./utilities/errorLogger.js");
const connection = require("./utilities/connection.js");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials:true,
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

const PORT = process.env.SERVER_PORT;

// calling connectDB to connect with mongodb
(async () => {
  await connection.connectDB();
})();

app.use("/api/users", router);

// error-logger
app.use(errorLogger);

app.listen(PORT, () => {
  console.log("App @ 1050");
});
