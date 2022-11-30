import Employee from "../model/Employee.js";
import { InternalServerError } from "../errorHandler/errors.js";
import {
  saveDocument,
  updateDocument,
  deleteDocument,
  bulkDocuments
} from "../elastic/EmployeeElastic.js";
import logger from "../../logger/logger.js";

class EmployeeRepository {
  async getEmployees(req) {
    const limit = req.query.limit || 1;
    const page = req.query.page || 0;
    return await Employee.findAndCountAll({
      limit,
      offset: limit * page,
      include: [
        {
          all: true,
          nested: true,
        },
      ],
    });
  }

  async findById(id) {
    return await Employee.scope('withoutPassword').findByPk(id, {
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
      throw new InternalServerError(
        "An error has ocurred trying to find an employee by email, please try again or contact support"
      );
    });
  }

  async createEmployee(data) {
    const createdEmployee = await Employee.sequelize
      .transaction(async (t) => {
        return await Employee.create(data, {
          transaction: t,
        }).catch((error) => {
          logger.error(
            `[EMPLOYEES_CREATE_ERROR] An error has ocurred trying to create the employee, error: `,
            error
          );
          throw new InternalServerError(
            "An error has ocurred trying to create the employee, please try again or contact support"
          );
        });
      })
      .then(async (createdEmployee) => {
        const employee = await this.findById(createdEmployee.id);
        saveDocument(employee);
        return employee;
      });

    return createdEmployee;
  }

  async createMultipleEmployees(data) {
    const createdEmployees = await Employee.sequelize
      .transaction(async (t) => {
        return await Employee.bulkCreate(data, {
          transaction: t,
        }).catch((error) => {
          logger.error(
            `[EMPLOYEES_CREATE_ERROR] Error trying to bulk create employees, error: `,
            error
          );
          throw new InternalServerError(
            "An error has ocurred trying to bulik create employees, please try again or contact support"
          );
        });
      })
      .then(async (results) => {
        const ids = results.map(result => result.id);
        console.log(ids);
        const employees = await Employee.findAll({
          attributes: {
            exclude: ['password']
          },
          raw:true,
          nest: true,
          where: {
            id: ids
          },
          include: [
            {
              all: true,
              nested: true,
            },
          ],
        });

        bulkDocuments(employees)
        return employees;
      });

    return createdEmployees;
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
      .catch((error) => {
        logger.error(
          `[EMPLOYEE_ERROR] An error has ocurred trying to update the employee: `,
          error
        );
        throw new InternalServerError(
          "An error has ocurred trying to update the employee, please try again or contact support"
        );
      })
      .then(async () => {
        const employee = await this.findById(id);
        updateDocument(employee);
        return employee;
      });

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
          deleteDocument(id);
          return true;
        })
        .catch((error) => {
          logger.error(
            `[EMPLOYEE_ERROR] An error has ocurred trying to delete the employee: `,
            error
          );
          throw new InternalServerError(
            "An error has ocurred trying to delete the employee, please try again or contact support"
          );
        });
    });

    return deleted;
  }
}

export default new EmployeeRepository();
