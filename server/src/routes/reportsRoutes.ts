import {Router} from "express";
import ReportController from "../controllers/ReportController";

const reportsRoutes: Router = Router();

reportsRoutes.post("/", ReportController.create);
reportsRoutes.get("/", ReportController.getAll);
reportsRoutes.get("/:id", ReportController.getOne);
reportsRoutes.put("/:id", ReportController.update);
reportsRoutes.put("/:id/status", ReportController.updateStatus);
reportsRoutes.delete("/:id", ReportController.delete);

export default reportsRoutes;