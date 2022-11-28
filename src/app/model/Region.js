import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/index.js";

class Region extends Model{
}

Region.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    regionName: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
}, {
    sequelize,
    modelName: "Region",
    tableName: "tb_regions",
    timestamps: true,
    underscored: true
});

export default Region;