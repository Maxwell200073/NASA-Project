const http = require("http");

const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");

const server = http.createServer(app);

async function startServer() {
    await loadPlanetsData();

    server.listen(process.env.PORT || 5000, () => {
        console.log(`Listening on port ${process.env.PORT || 5000}`);
    });
}
startServer();
