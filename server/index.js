
import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import conn from "./utils/DbConnection.js";
import router from "./routes/index.js";
const app = express();
conn();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 8000;


app.use("/api/v1", router);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});