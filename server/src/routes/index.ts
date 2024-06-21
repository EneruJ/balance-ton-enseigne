import {Request, Response, Router} from "express";
import authRoutes from "./authRoutes";
import citiesRoutes from "./citiesRoutes";
import reportsRoutes from "./reportsRoutes";
import rolesRoutes from "./rolesRoutes";
import usersRoutes from "./usersRoutes";

const routes: Router = Router();

routes.get("/", (request: Request, response: Response) => {
    response.json("Connected to API.");
});

routes.use("/auth", authRoutes);
routes.use("/cities", citiesRoutes);
routes.use("/reports", reportsRoutes);
routes.use("/roles", rolesRoutes);
routes.use("/users", usersRoutes);

routes.use("*", (request: Request, response: Response) => {
    response.status(404).json({
        status: 404,
        statusText: "Not Found",
        message: "The requested route was not found.",
    });
});

export default routes;