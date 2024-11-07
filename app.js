const express = require("express");
require("./config");
const cors = require("cors");
const Router = require("./routes/appRouter");

const allowedOrigins = [
    "https://usstore.vercel.app",
    "https://us-weather-application.vercel.app/",
    "https://asdevelopers.vercel.app",
    "https://usquizhub.vercel.app",
    "http://localhost:3001",
];

const corsOptions = (req, callback) => {
    const origin = req.header("Origin");
    if (allowedOrigins.includes(origin)) {
        callback(null, {origin: true});
    } else {
        callback(null, {origin: false});
    }
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", Router);

app.get("/", (req, res) => {
    res.send("Backend Running Successfully");
});

app.listen(8000, () => {
    console.log("Server Running on Port 8000");
});
