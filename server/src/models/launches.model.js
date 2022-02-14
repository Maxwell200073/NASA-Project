const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    mission: "Kepler Exploration Jarano",
    rocket: "Explorer IS1",
    launchDate: new Date("December 27, 2030"),
    target: "Kepler-442 b",
    customer: ["ZTM", "NASA"],
    upcoming: true,
    success: true,
    flightNumber: 100,
};
const launch2 = {
    mission: "Kepler Exploration Jeff",
    rocket: "Explorer IS1",
    launchDate: new Date("October 27, 2033"),
    target: "Kepler-442 b",
    customer: ["SpaceX", "NASA"],
    upcoming: true,
    success: true,
};

launches.set(launch.flightNumber, launch);

function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(
        latestFlightNumber,
        Object.assign(launch, {
            customer: ["ZTM", "NASA"],
            upcoming: true,
            success: true,
            flightNumber: latestFlightNumber,
        })
    );
}

function getLaunchesData() {
    return Array.from(launches.values());
}

module.exports = {
    getLaunchesData,
    addNewLaunch,
};
