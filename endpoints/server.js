import express from "express";
import adminRouter from "./admin.js";
import voterRouter from "./voters.js"
import candidateRouter from "./candidate.js"
import votesRouter from "./votes.js";
const server = express();

server.use(express.json());
server.use("/api/admin", adminRouter);
server.use("/api/voters", voterRouter);
server.use("/api/candidates", candidateRouter);
server.use("/api/votes", votesRouter);

export default server;