import { resolvers } from "./resolvers";
import {buildSubgraphSchema} from "@apollo/subgraph";
import { parse } from "graphql";
import {readFileSync} from "fs";
import {join} from "node:path";

const typeDefs = parse(readFileSync(join(__dirname,'./schema.graphql'), 'utf-8'));

export const schema = buildSubgraphSchema([{ typeDefs, resolvers }])