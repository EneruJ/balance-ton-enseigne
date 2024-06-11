import database from "./config/database";
import express, {Express} from "express";
import {APP_PORT} from "./config/variables";
import routes from "./routes";

database.getConnection((err, connection) => {
    if (err) {
        console.error(`[server]: Unable to connect to the database: ${err}`);
        return;
    }
    console.log(`[server]: Connected to the database.`);
    database.releaseConnection(connection);
});

const app: Express = express();

app.use(express.json());

app.use(routes);

app.listen(APP_PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${APP_PORT}`);
    console.log(`[server]: Press Ctrl+C to quit.`);
});