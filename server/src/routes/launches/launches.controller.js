const launchesModel = require("../../models/launches.model");

function getLaunches(req, res) {
    return res.status(200).json(Array.from(launchesModel.values()));
}

module.exports = {
    getLaunches,
};
