import {Router} from "express";
import AuthController from "../controllers/AuthController";

const authRoutes: Router = Router();

authRoutes.post("/register", AuthController.register);
authRoutes.post("/login", AuthController.login);
authRoutes.post("/logout", AuthController.logout);

export default authRoutes;