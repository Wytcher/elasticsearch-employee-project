import elasticClient from "./Elastic.js";
import logger from "../../logger/logger.js";
import * as dotenv from "dotenv";

dotenv.config();

export const getAllEmployees = async (filters) => {
  const { id, firstName, lastName } = filters;

  const query = [];
  if (id) {
    query.push({
      match: {
        id,
      },
    });
  }

  if (firstName) {
    query.push({
      match: {
        firstName,
      },
    });
  }

  if (lastName) {
    query.push({
      match: {
        lastName,
      },
    });
  }

  return await elasticClient
    .search({
      index: process.env.EMPLOYEE_INDEX,
      query: {
        bool: {
          should: query,
        },
      },
    })
    .then((documents) => {
      logger.info(`[ELASTIC_GET_ALL] Employees found`);
      const result = documents.hits.hits.map((hit) => hit._source);
      return result;
    })
    .catch((err) => {
      logger.error(
        `[ELASTIC_GET_ALL_ERROR]Error trying to get all employees in elastic error: `,
        err
      );
      return;
    });
};

export const getDocument = async (id) => {
  logger.info(`[ELASTIC_SAVE] Trying to found document in elastic`);
  return await elasticClient
    .get({
      index: process.env.EMPLOYEE_INDEX,
      id: id,
    })
    .then((document) => {
      logger.info(`[ELASTIC_GET] Document found`);
      return document._source;
    })
    .catch((err) => {
      logger.error(
        `[ELASTIC_GET_ERROR]Error trying to get document in elastic error: `,
        err
      );
      return;
    });
};

export const saveDocument = async (doc) => {
  const {
    id,
    firstName,
    lastName,
    email,
    phoneNumber,
    salary,
    hireDate,
    job,
    department,
  } = doc;

  logger.info(`[ELASTIC_SAVE] Trying to save into elastic`);
  await elasticClient
    .create({
      index: process.env.EMPLOYEE_INDEX,
      id: id,
      document: {
        id,
        firstName,
        lastName,
        email,
        phoneNumber,
        salary,
        hireDate,
        job,
        department,
      },
    })
    .then(() => {
      logger.info(`[ELASTIC_SAVE] Document has been saved successfully`);
      return;
    })
    .catch((err) => {
      logger.error(
        `[ELASTIC_SAVE_ERROR]Error trying to save document into elastic error: `,
        err
      );
      return;
    });
};

export const bulkDocuments = async (bulk) => {
  const employeesBulk = bulk.flatMap((doc) => [
    { index: { _index: process.env.EMPLOYEE_INDEX, _id: doc.id } },
    doc,
  ]);

  logger.info(`[ELASTIC_BULK] Trying to save employees bulk into elastic`);
  await elasticClient
    .bulk({
      body: employeesBulk,
    })
    .then(() => {
      logger.info(`[ELASTIC_BULK] Employees bulk has been saved successfully`);
      return;
    })
    .catch((error) => {
      logger.error(
        `[ELASTIC_BULK_ERROR]Error trying to save employees bulk into elastic error: `,
        error
      );
      return;
    });
};

export const updateDocument = async (doc) => {
  const {
    id,
    firstName,
    lastName,
    email,
    phoneNumber,
    salary,
    hireDate,
    job,
    department,
  } = doc;

  logger.info(`[ELASTIC_UPDATE] Trying to update into elastic`);
  await elasticClient
    .update({
      index: process.env.EMPLOYEE_INDEX,
      id: id,
      doc: {
        id,
        firstName,
        lastName,
        email,
        phoneNumber,
        salary,
        hireDate,
        job,
        department,
      },
    })
    .then(() => {
      logger.info(`[ELASTIC_UPDATE] Document has been updated successfully`);
      return;
    })
    .catch((err) => {
      logger.error(
        `[ELASTIC_SAVE_ERROR]Error trying to update document into elastic error: `,
        err
      );
      return;
    });
};

export const deleteDocument = async (id) => {
  logger.info(`[ELASTIC_DELETE] Trying to delete into elastic`);
  await elasticClient
    .delete({
      index: process.env.EMPLOYEE_INDEX,
      id: id,
    })
    .then(() => {
      logger.info(`[ELASTIC_DELETE] Document has been deleted successfully`);
      return;
    })
    .catch((err) => {
      logger.error(
        `[ELASTIC_DELETE_ERROR] Error trying to delete document into elastic error: `,
        err
      );
      return;
    });
};
