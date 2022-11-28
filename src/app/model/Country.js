import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/index.js";
import Region from "./Region.js";

class Country extends Model {}

Country.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    countryName: {
      type: DataTypes.STRING(30),
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
    modelName: "Country",
    tableName: "tb_countries",
    timestamps: true,
    underscored: true,
  }
);

Region.hasOne(Country, {
  foreignKey: {
    name: "regionId",
    field: "region_id",
  },
  as: "country",
});

Country.belongsTo(Region, {
  foreignKey: {
    name: "regionId",
    field: "region_id",
  },
  as: "region",
});

export default Country;
