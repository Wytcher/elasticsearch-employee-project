import Employee from "../model/Employee.js";
import { InternalServerError } from "../errorHandler/errors.js";
import { saveDocument } from '../elastic/EmployeeElastic.js';

class EmployeeRepository {
  async findById(id) {
    return await Employee.findByPk(id, {
      include:[
        {
          all: true,
          nested: true,
        }
      ]
    });
  }

  async findByEmail(email) {
    return await Employee.findOne({
      where: {
        email: email,
      },
    }).catch((error) => {
      console.log(error);
      throw new InternalServerError(
        "An error has ocurred trying to find an employee by email, please try again or contact support"
      );
    });
  }

  async createEmployee(data) {
    const createdEmployee = await Employee.sequelize.transaction(async (t) => {
      return await Employee.create(data, { 
        transaction: t
      }).catch((error) => {
        console.log(error);
        throw new InternalServerError(
          "An error has ocurred trying to create the user, please try again or contact support"
        );
      });
    });

    const employeeWithAssoc = await this.findById(createdEmployee.id);
    saveDocument(employeeWithAssoc);

    return employeeWithAssoc;
  }
}

export default new EmployeeRepository();
