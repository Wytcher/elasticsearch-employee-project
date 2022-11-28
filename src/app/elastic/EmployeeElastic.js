import elasticClient from "./Elastic.js";
import logger from "../../logger/logger.js";
import * as dotenv from 'dotenv';

dotenv.config();

export const saveDocument = async(doc) => {
    const {
        id,
        firstName,
        lastName,
        email,
        phoneNumber,
        salary,
        hireDate,
        job,
        department
    } = doc

    logger.info(`[ELASTIC_SAVE] Trying to save into elastic`);
    await elasticClient.index({
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
            department
        }
    });

    logger.info(`[ELASTIC_SAVE] Document has been saved successfully`);
}