import {Router} from "express";
import UserController from "../controllers/UserController";

const usersRoutes: Router = Router();

usersRoutes.post("/", UserController.create);
usersRoutes.get("/", UserController.getAll);
usersRoutes.get("/:id", UserController.getOne);
usersRoutes.put("/:id", UserController.update);
usersRoutes.put("/:id/password", UserController.updatePassword);
usersRoutes.delete("/:id", UserController.delete);

export default usersRoutes;