const {
    addNewLaunch,
    launchExist,
    getLaunchesData,
    abortLaunch,
} = require("../../models/launches.model");

async function httpGetLaunches(req, res) {
    return res.status(200).json(await getLaunchesData());
}

async function httpPostNewLaunch(req, res) {
    const launch = req.body;

    if (
        !launch.mission ||
        !launch.rocket ||
        !launch.target ||
        !launch.launchDate
    ) {
        return res.status(400).json({
            error: "Missing required mission field",
        });
    }

    launch.launchDate = new Date(launch.launchDate);

    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: "Invalid launch date",
        });
    }

    await addNewLaunch(launch);
    return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
    const launchId = +req.params.id;

    if (!launchExist(launchId)) {
        return res.status(404).json({
            error: "launch not found",
        });
    }
    const aborted = await abortLaunch(launchId);
    return res.status(200).json(aborted);
}

module.exports = {
    httpGetLaunches,
    httpPostNewLaunch,
    httpAbortLaunch,
};
