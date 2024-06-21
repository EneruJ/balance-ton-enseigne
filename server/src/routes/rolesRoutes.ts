import {Router} from "express";
import RoleController from "../controllers/RoleController";

const rolesRoutes: Router = Router();

rolesRoutes.post("/", RoleController.create);
rolesRoutes.get("/", RoleController.getAll);
rolesRoutes.get("/:id", RoleController.getOne);
rolesRoutes.put("/:id", RoleController.update);
rolesRoutes.delete("/:id", RoleController.delete);

export default rolesRoutes;