import { Model, DataTypes } from "sequelize";
import sequelize from "./database.js";

class ApiKey extends Model {}

ApiKey.init(
  {
    apiKey: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "apiKey",
  }
);

export default ApiKey;
