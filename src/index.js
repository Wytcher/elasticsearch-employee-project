import express from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger/swaggerConfig.json" assert { type: "json" };
import * as dotenv from "dotenv";
import EmployeeRoutes from "./app/routes/EmployeeRoutes.js";
import { sequelize } from './database/index.js';
import logger from './logger/logger.js';
import {createIndex} from './app/elastic/elasticFuncs.js';

dotenv.config();

const app = express();
const indexes = process.env.ELASTIC_INDEXES.split(',')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(EmployeeRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).send({
    path: req.path,
    statusCode: err.statusCode,
    timestamp: err.timestamp,
    error: err.name,
  });
});

for(let index of indexes){
  await createIndex(index);
}

sequelize.authenticate().then(() => {
  logger.info(`[DB_CONNECTION] Connection to db ${process.env.DB_NAME} has been established successfully`);
  app.listen(process.env.PORT, () => {
    logger.info(`[APP_CONNECTION] App connection successfull, listening port ${process.env.PORT}`);
  })
}).catch((error) => {
  logger.error(`[DB_CONNECTION] Unable to connect to the database`, error);
  return;
});


