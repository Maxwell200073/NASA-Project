const express = require("express");

const { httpGetLaunches, httpPostNewLaunch } = require("./launches.controller");
const launchesRouter = express.Router();

launchesRouter.get("/", httpGetLaunches);
launchesRouter.post("/", httpPostNewLaunch);
module.exports = launchesRouter;
