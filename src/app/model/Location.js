import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/index.js";
import Country from "./Country.js";

class Location extends Model {}

Location.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    streetAddress: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    state: {
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
    modelName: "Location",
    tableName: "tb_locations",
    timestamps: true,
    underscored: true,
  }
);

Country.hasOne(Location, {
  foreignKey: {
    name: "countryId",
    field: "country_id",
  },
  as: "location",
});

Location.belongsTo(Country, {
  foreignKey: {
    name: "countryId",
    field: "country_id",
  },
  as: "country",
});

export default Location;
