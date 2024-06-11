import {Router} from "express";
import UserController from "../controllers/UserController";

const usersRoutes = Router();

usersRoutes.post("/:id", UserController.createUser);
usersRoutes.get("/", UserController.getAllUsers);
usersRoutes.get("/:id", UserController.getUser);
usersRoutes.put("/:id", UserController.updateUser);
usersRoutes.delete("/:id", UserController.deleteUser);

export default usersRoutes;