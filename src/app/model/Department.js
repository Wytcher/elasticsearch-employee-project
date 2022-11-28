import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/index.js";
import Location from "./Location.js";

class Department extends Model {}

Department.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    departmentName: {
      type: DataTypes.STRING(50),
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
    modelName: "Department",
    tableName: "tb_departments",
    timestamps: true,
    underscored: true,
  }
);

Location.hasOne(Department, {
  foreignKey: {
    name: "locationId",
    field: "location_id",
  },
  as: "deparment",
});

Department.belongsTo(Location, {
  foreignKey: {
    name: "locationId",
    field: "location_id",
  },
  as: "location",
});

export default Department;
