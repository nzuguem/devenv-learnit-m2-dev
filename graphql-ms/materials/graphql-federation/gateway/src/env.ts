import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { resolve } from 'node:path';

const envPath =
    process.env.NODE_ENV === 'production'
        ? resolve(__dirname, './.env')
        : resolve(__dirname, '../.env')

const config = dotenv.config({
    path: envPath,
    override: true
})
dotenvExpand.expand(config)

export const {
    USERS_SUBGRAPH_SERVICE_BASE_URL = '',
    PRODUCTS_SUBGRAPH_SERVICE_BASE_URL = '',
    REVIEWS_SUBGRAPH_SERVICE_BASE_URL = '',
} = process.env;