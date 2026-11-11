import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { resolvers } from "./resolvers";
import { addResolversToSchema } from "@graphql-tools/schema";
import { join } from "node:path";

const schemaWithoutResolvers = loadSchemaSync(join(__dirname, './schema.graphql'), {
    loaders: [new GraphQLFileLoader()]
})

export const schema = addResolversToSchema({ schema: schemaWithoutResolvers, resolvers })
