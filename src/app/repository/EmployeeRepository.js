import Employee from "../model/Employee.js";
import { InternalServerError } from "../errorHandler/errors.js";
import {
  saveDocument,
  updateDocument,
  deleteDocument,
} from "../elastic/EmployeeElastic.js";
import logger from "../../logger/logger.js";

class EmployeeRepository {
  async findById(id) {
    return await Employee.findByPk(id, {
      include: [
        {
          all: true,
          nested: true,
        },
      ],
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
        transaction: t,
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

  async updateEmployee(req) {
    const {
      id,
      firstName,
      lastName,
      phoneNumber,
      salary,
      hireDate,
      jobId,
      departmentId,
    } = req.body;

    const updatedEmployee = await Employee.sequelize
      .transaction(async (t) => {
        return await Employee.update(
          {
            firstName,
            lastName,
            phoneNumber,
            salary,
            hireDate,
            jobId,
            departmentId,
          },
          {
            where: {
              id: id,
            },
            transaction: t,
          }
        );
      })
      .then(async () => {
        return await this.findById(id);
      })
      .catch((error) => {
        logger.info(
          `[EMPLOYEE_ERROR] An error has ocurred trying to update the employee: `,
          error
        );
        throw new InternalServerError(
          "An error has ocurred trying to update the employee, please try again or contact support"
        );
      });

    updateDocument(updatedEmployee);
    return updatedEmployee;
  }

  async deleteEmployee(req) {
    const { id } = req.params;

    const deleted = await Employee.sequelize.transaction(async (t) => {
      return await Employee.destroy({
        where: {
          id,
        },
      })
        .then(() => {
          return true;
        })
        .catch((error) => {
          logger.info(
            `[EMPLOYEE_ERROR] An error has ocurred trying to delete the employee: `,
            error
          );
          throw new InternalServerError(
            "An error has ocurred trying to delete the employee, please try again or contact support"
          );
        });
    });

    deleteDocument(id);
    return deleted;
  }
}

export default new EmployeeRepository();
