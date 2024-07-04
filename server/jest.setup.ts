import {Server} from "node:http";
import app from "./src/config/app";
import database from "./src/config/database";

let server: Server;

beforeAll((done) => {
    console.log("=== beforeAll ===");
    server = app.listen(4000, done);
});

afterAll(async () => {
    console.log("=== afterAll ===");
    server.close();
    await database.end();
});