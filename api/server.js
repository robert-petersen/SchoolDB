const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());

const authRouter = require("./auth/auth-router.js");
const studentRouter = require("./student/student-router.js");
const volunteerRouter = require("./volunteer/volunteer-router.js");
const adminRouter = require("./admin/admin-router.js");

server.use("/api/auth", authRouter);
// server.use("/api/student", studentRouter);
// server.use("/api/volunteer", volunteerRouter); 
// server.use("/api/admin", adminRouter); 

server.get("/", (req, res) => {
  res.send(`
    <h1>Welcome to the SchoolCloud API</h1>
    <p> Refer to repo README for endpoints and data structure </p>
  `);
});

module.exports = server;