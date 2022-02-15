const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    mission: "Kepler Exploration Jarano",
    rocket: "Explorer IS1",
    launchDate: new Date("December 27, 2030"),
    target: "Kepler-442 b",
    customers: ["ZTM", "NASA"],
    upcoming: true,
    success: true,
    flightNumber: 100,
};

launches.set(launch.flightNumber, launch);

function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(
        latestFlightNumber,
        Object.assign(launch, {
            customers: ["ZTM", "NASA"],
            upcoming: true,
            success: true,
            flightNumber: latestFlightNumber,
        })
    );
}

function launchExist(launchId) {
    return launches.has(launchId);
}

function getLaunchesData() {
    return Array.from(launches.values());
}

function abortLaunch(id) {
    const aborted = launches.get(id);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

module.exports = {
    addNewLaunch,
    launchExist,
    getLaunchesData,
    abortLaunch,
};
