const { getPlanetsData } = require("../../models/planets.model");

function httpGetPlanets(req, res) {
    return res.status(200).json(getPlanetsData());
}

module.exports = {
    httpGetPlanets,
};
