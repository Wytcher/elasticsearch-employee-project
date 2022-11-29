import EmployeeService from "../service/EmployeeService.js";

class EmployeeController {
  async findById(req, res, next) {
    try {
      const employee = await EmployeeService.findById(req.params.id);

      return res.send({
        employee,
      });
    } catch (error) {
      next(error);
    }
  }

  async createEmployee(req, res, next) {
    try {
      const createdEmployee = await EmployeeService.createEmployee(req);

      return res.status(201).send({
        employee: createdEmployee,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateEmployee(req, res, next) {
    try {
      req.body.id = req.params.id;
      const updatedEmployee = await EmployeeService.updateEmployee(req);

      return res.status(200).send({
        employee: updatedEmployee,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteEmployee(req, res, next){
    try {
      const deleted = await EmployeeService.deleteEmployee(req);

      return res.status(200).send({
        deleted,
        message: "Employee has been deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new EmployeeController();
