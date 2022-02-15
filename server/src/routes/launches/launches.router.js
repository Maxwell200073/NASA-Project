const express = require("express");

const {
    httpGetLaunches,
    httpPostNewLaunch,
    httpAbortLaunch,
} = require("./launches.controller");
const launchesRouter = express.Router();

launchesRouter.get("/", httpGetLaunches);
launchesRouter.post("/", httpPostNewLaunch);
launchesRouter.delete("/:id", httpAbortLaunch);
module.exports = launchesRouter;
