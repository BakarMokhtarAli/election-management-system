import express from "express";
import adminRouter from "./admin.js";

const server = express();

server.use(express.json());
server.use("/api/admin", adminRouter);

export default server;