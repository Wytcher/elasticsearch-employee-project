import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/index.js";

class Jobs extends Model {}

Jobs.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    jobTitle: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    minSalary: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    maxSalary: {
      type: DataTypes.DECIMAL(10,2),
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
    modelName: "Jobs",
    tableName: "tb_jobs",
    timestamps: true,
    underscored: true,
  }
);

export default Jobs;
