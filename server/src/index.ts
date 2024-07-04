import database from "./config/database";
import {APP_PORT} from "./config/variables";
import app from "./config/app";

database.getConnection()
    .then((connection) => {
        console.log(`[server]: Connected to the database.`);
        connection.release();
    })
    .catch((error) => {
        console.error(`[server]: Unable to connect to the database: ${error}`);
    });

const server = app.listen(APP_PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${APP_PORT}`);
    console.log(`[server]: Press Ctrl+C to quit.`);
});

const closeDatabaseConnection = async () => {
    console.log(`[server]: Closing database connection...`);
    await database.end();
    console.log(`[server]: Database connection closed.`);
}

process.on('SIGTERM', async () => {
    console.log('[server]: SIGTERM received. Shutting down gracefully.');
    server.close(async () => {
        await closeDatabaseConnection();
        process.exit(0);
    });
});

process.on('SIGINT', async () => {
    console.log('[server]: SIGINT received. Shutting down gracefully.');
    server.close(async () => {
        await closeDatabaseConnection();
        process.exit(0);
    });
});