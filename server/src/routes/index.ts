import {Router} from "express";
import authRoutes from "./authRoutes";
import usersRoutes from "./usersRoutes";

const routes: Router = Router();

routes.get("/", (req, res) => {
    res.send("Connected to API.");
});
routes.use("/auth", authRoutes);
routes.use("/users", usersRoutes)

export default routes;