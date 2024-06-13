const express = require("express");
require("./config");
const cors = require("cors");
const Router = require("./routes/appRouter");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", Router);

app.get("/", (req, res) => {
    res.send("Backend Running Successfully");
});

app.listen(8000, () => {
    console.log("Server Running on Port 8000");
});
