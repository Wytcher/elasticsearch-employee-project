import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/index.js";
import Department from "./Department.js";
import Jobs from "./Jobs.js";
import bcrypt from 'bcryptjs'

class Employee extends Model {}

Employee.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    hireDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "Employee",
    tableName: "tb_employees",
    timestamps: true,
    underscored: true,
  }
);

Employee.beforeCreate(async employee => {
  const password = employee.password;
  if (!employee) {
      return;
  }
  const hash = await bcrypt.hash(password, 10);
  employee.password = hash;
});

Jobs.hasOne(Employee, {
  foreignKey: {
    name: "jobId",
    field: "job_id",
  },
  as: 'job'
});

Employee.belongsTo(Jobs, {
  foreignKey: {
    name: "jobId",
    field: "job_id",
  },
  as: 'job'
});

Department.hasOne(Employee, {
  foreignKey: {
    name: "departmentId",
    field: "department_id",
  },
  as: 'department'
});

Employee.belongsTo(Department, {
  foreignKey: {
    name: "departmentId",
    field: "department_id",
  },
  as: 'department'
});

export default Employee;
