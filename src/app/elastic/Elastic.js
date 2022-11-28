import { Client } from "@elastic/elasticsearch";
import * as dotenv from "dotenv";

dotenv.config();

const elasticClient = new Client({
  node: 'http://localhost:9200'
});

export default elasticClient;
