import {Router} from "express";
import CityController from "../controllers/CityController";

const citiesRoutes: Router = Router();

citiesRoutes.post("/", CityController.create);
citiesRoutes.get("/", CityController.getAll);
citiesRoutes.get("/:id", CityController.getOne);
citiesRoutes.put("/:id", CityController.update);
citiesRoutes.delete("/:id", CityController.delete);

export default citiesRoutes;