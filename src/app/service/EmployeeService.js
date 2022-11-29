import EmployeeRepository from "../repository/EmployeeRepository.js";
import {
  ObjectNotFoundError,
  InternalServerError,
  ValidatorError,
} from "../errorHandler/errors.js";
import { getAllEmployees } from "../elastic/EmployeeElastic.js";

class EmployeeService {
  async getEmployees(req) {
    const { id, firstName, lastName } = req.query;

    if (id || firstName || lastName) {

      const employees = await getAllEmployees({
        id,
        firstName,
        lastName
      });

      return employees;

    } else {
      const employees = EmployeeRepository.getEmployees(req);

      return employees;
    }
  }

  async findById(id) {
    return await EmployeeRepository.findById(id).catch((error) => {
      console.log(error);
      throw new ObjectNotFoundError(
        `Employee for the given id: ${id} not found`
      );
    });
  }

  async createEmployee(req) {
    return await EmployeeRepository.createEmployee(req.body)
      .then(async (employee) => {
        employee.password = undefined;
        return employee;
      })
      .catch((error) => {
        console.log(error);
        throw new InternalServerError(
          "An error has ocurred trying to create an employee, try again or contact support"
        );
      });
  }

  async updateEmployee(req) {
    return await EmployeeRepository.updateEmployee(req)
      .then(async (employee) => {
        employee.password = undefined;
        return employee;
      })
      .catch((error) => {
        console.log(error);
        throw new InternalServerError(
          "An error has ocurred trying to create an employee, try again or contact support"
        );
      });
  }

  async deleteEmployee(req) {
    return await EmployeeRepository.deleteEmployee(req).catch((error) => {
      console.log(error);
      throw new InternalServerError(
        "An error has ocurred trying to create an employee, try again or contact support"
      );
    });
  }
}

export default new EmployeeService();
