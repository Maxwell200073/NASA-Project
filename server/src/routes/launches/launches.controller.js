const {
    getLaunchesData,
    addNewLaunch,
} = require("../../models/launches.model");

function httpGetLaunches(req, res) {
    return res.status(200).json(getLaunchesData());
}

function httpPostNewLaunch(req, res) {
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

    addNewLaunch(launch);
    return res.status(201).json(launch);
}

module.exports = {
    httpGetLaunches,
    httpPostNewLaunch,
};
