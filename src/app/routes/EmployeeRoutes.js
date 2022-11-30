import { Router } from "express";
import EmployeeController from "../controller/EmployeeController.js";

const router = new Router();

router.get("/employees", EmployeeController.getEmployees);

router.post("/employees", EmployeeController.createEmployee);

router.post("/employees/bulk", EmployeeController.createMultiplesEmployees);

router.get("/employees/:id", EmployeeController.findById);

router.patch("/employees/:id", EmployeeController.updateEmployee);

router.delete("/employees/:id", EmployeeController.deleteEmployee);

export default router;
