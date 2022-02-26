const http = require("http");

const app = require("./app");
const mongoose = require("mongoose");
const { loadPlanetsData } = require("./models/planets.model");
const MONGO_URL = require("../private");

const server = http.createServer(app);

async function startServer() {
    await mongoose
        .connect(MONGO_URL)
        .then(() => console.log("Mongo Connected!"))
        .catch(console.log);

    await loadPlanetsData();

    server.listen(process.env.PORT || 5000, () => {
        console.log(`Listening on port ${process.env.PORT || 5000}`);
    });
}
startServer();
