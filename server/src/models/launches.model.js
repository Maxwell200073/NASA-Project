const launches = require("./launches.mongo");
const planets = require("./planets.mongo");

const DEFAULT_FLIGHTNUMBER = 100;

async function addNewLaunch(launch) {
    // latestFlightNumber++;

    return await saveLaunch(launch);
}

async function launchExist(launchId) {
    return await launches.findOne(
        {
            flightNumber: launchId,
        },
        {
            _id: 0,
            __v: 0,
        }
    );
}

async function getLatestFlightNumber() {
    const latestFlight = await launches
        .findOne(
            {},
            {
                flightNumber: 1,
                _id: 0,
            }
        )
        .sort({ flightNumber: -1 });

    if (!latestFlight) {
        return DEFAULT_FLIGHTNUMBER;
    }

    return await latestFlight.flightNumber;
}

async function getLaunchesData() {
    return await launches.find(
        {},
        {
            _id: 0,
            __v: 0,
        }
    );
}

async function abortLaunch(id) {
    const aborted = await launches.findOne({
        flightNumber: id,
    });
    await launches.updateOne(aborted, {
        upcoming: false,
        success: false,
    });
    aborted.upcoming = false;
    aborted.success = false;
    return await aborted;
}

async function saveLaunch(launch) {
    if (await planetInDatabase(launch.target)) {
        let latestFlightNumber = (await getLatestFlightNumber()) + 1;
        return await launches.updateOne(
            {
                flightNumber: latestFlightNumber,
            },
            {
                flightNumber: latestFlightNumber,
                mission: launch.mission,
                rocket: launch.rocket,
                launchDate: launch.launchDate,
                target: launch.target,
                customers: ["ZTM", "NASA"],
                upcoming: true,
                success: true,
            },
            {
                upsert: true,
            }
        );
    } else {
        throw new Error("Planet not found");
    }
}

async function planetInDatabase(planet) {
    return await planets.findOne({
        keplerName: planet,
    });
}

module.exports = {
    addNewLaunch,
    launchExist,
    getLaunchesData,
    abortLaunch,
};
