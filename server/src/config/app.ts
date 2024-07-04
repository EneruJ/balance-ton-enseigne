import express, {Express} from "express";
import cors from "cors";
import routes from "../routes";

const app: Express = express();

app.disable('x-powered-by');
app.use(cors());
app.use(express.json());
app.use(routes);

export default app;