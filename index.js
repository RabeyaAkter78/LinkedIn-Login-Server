// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import mongoose from "mongoose";

// dotenv.config();
// const port = 5000
// const app = express()

// app.use(cookieParser())
// app.use(express.json())
// app.use(cors({
//     origin: ' http://localhost:5173',
//     credentials: true
// }))

// mongoose.connect("mongodb://localhost:27017/linkedin").then(() => {
//     console.log("Connected to MongoDB")
// }).catch((err) => {
//     console.log("error in connecting to MongoDB", err)
// })



// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`)
// })




require("dotenv").config();
const data = require('./config/index.js');
const AuthRoutes = require('./routes/auth.route.js');

const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const port = 5000
// const port = data.PORT

// Middlewares
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser())
app.use('/api/linkedin', AuthRoutes)

mongoose.connect("mongodb://localhost:27017/linkedin").then(() => {
    // mongoose.connect(data.MONGODB_CONNECTION).then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log("error in connecting to MongoDB", err)
})



app.get("/", (req, res) => {
    res.send("server is running");
});

app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});


