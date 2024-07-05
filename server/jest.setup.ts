import {Server} from "node:http";
import app from "./src/config/app";
import database from "./src/config/database";
import initializeTestDatabase from "./src/fixtures/testDatabaseFixtures";
import {APP_PORT} from "./src/config/variables";

let server: Server;

beforeAll(async () => {
    process.env.NODE_ENV = "test";
    // console.log("=== beforeAll ===");
    try {
        const connexion = await database.getConnection();
        // console.log(`[database]: Connected to the test database.`);
        await initializeTestDatabase(connexion);
        // console.log(`[database]: Test database initialized.`);
        connexion.release();

        server = app.listen(APP_PORT, () => {
            // console.log(`Server is running on port 4000`);
        });
    } catch (error) {
        console.error(`[database]: Failed to initialize test environment: ${error}`);
    }
});

afterAll(async () => {
    // console.log("=== afterAll ===");
    server.close();
    await database.end();
});