import {Router} from "express";
import AuthController from "../controllers/AuthController";

const authRoutes: Router = Router();

authRoutes.post("/login", AuthController.login);
authRoutes.post("/logout", AuthController.logout);
authRoutes.get("/current", AuthController.current);

export default authRoutes;