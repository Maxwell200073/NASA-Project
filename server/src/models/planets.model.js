const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");
const habitablePlanets = [];

function isHabitable(planet) {
    return (
        planet["koi_disposition"] === "CONFIRMED" &&
        planet["koi_insol"] > 0.36 &&
        planet["koi_insol"] < 1.11 && // Could also use dot notation on all
        planet["koi_prad"] < 1.6
    );
}
function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(
            path.join(__dirname, "..", "..", "data", "kepler_data.csv")
        )
            .pipe(
                parse({
                    comment: "#",
                    columns: true, // Makes each row its own object of key:value pairs instead of an array of values
                })
            )
            .on("data", (data) => {
                if (isHabitable(data)) {
                    habitablePlanets.push(data);
                }
            })
            .on("error", (err) => {
                console.log(err);
                reject(err);
            })
            .on("end", () => {
                habitablePlanets.map((planet) => planet.kepler_name);
                resolve();
            });
    });
}

function getPlanetsData() {
    return habitablePlanets;
}

module.exports = {
    loadPlanetsData,
    getPlanetsData,
};
