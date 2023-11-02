import express from "express";
import adminRouter from "./admin.js";
import voterRouter from "./voters.js"
import candidateRouter from "./candidate.js"
const server = express();

server.use(express.json());
server.use("/api/admin", adminRouter);
server.use("/api/voters", voterRouter);
server.use("/api/candidates", candidateRouter);

export default server;