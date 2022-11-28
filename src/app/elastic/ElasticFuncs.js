import logger from "../../logger/logger.js";
import elasticClient from './Elastic.js';

const createIndex = async (indexName) => {
    if (await checkIndex(indexName)){
        logger.info(`[ELASTIC_INDEX] Elastic index with name ${indexName} already exists`);
        return;
    }
    await elasticClient.indices.create({index: indexName});
    logger.info(`[ELASTIC_INDEX_CREATED] Elastic index ${indexName} has been created successfully`);
}

const checkIndex = async(indexName) => {
    return await elasticClient.indices.exists({index: indexName});
}

export {
    createIndex,
    checkIndex
};