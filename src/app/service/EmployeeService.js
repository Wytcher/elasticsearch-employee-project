import EmployeeRepository from "../repository/EmployeeRepository.js";
import { InternalServerError } from "../errorHandler/errors.js";
import { getAllEmployees } from "../elastic/EmployeeElastic.js";

class EmployeeService {
  async getEmployees(req) {
    const { id, firstName, lastName } = req.query;

    if (id || firstName || lastName) {
      const employees = await getAllEmployees({
        id,
        firstName,
        lastName,
      });

      return employees;
    } else {
      const employees = EmployeeRepository.getEmployees(req);

      return employees;
    }
  }

  async findById(id) {
    return await EmployeeRepository.findById(id).catch((error) => {
      throw error;
    });
  }

  async createEmployee(req) {
    return await EmployeeRepository.createEmployee(req.body).catch((error) => {
      throw error;
    });
  }

  async createMultipleEmployees(req) {
    return await EmployeeRepository.createMultipleEmployees(req.body).catch(
      (error) => {
        throw error;
      }
    );
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
      throw error;
    });
  }
}

export default new EmployeeService();
