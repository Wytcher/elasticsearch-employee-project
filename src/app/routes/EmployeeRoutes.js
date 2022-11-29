import { Router } from "express";
import EmployeeController from "../controller/EmployeeController.js";

const router = new Router();

router.post("/employees", EmployeeController.createEmployee);

router.get("/employees/:id", EmployeeController.findById);

router.patch("/employees/:id", EmployeeController.updateEmployee);

export default router;
