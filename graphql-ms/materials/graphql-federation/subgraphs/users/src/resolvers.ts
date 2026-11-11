import { users } from "./datasource";

export const resolvers = {
    Query: {
        user: (_, { id }) => users.find(user => user.id === id),
        users: (_, { limit = 10, offset = 0 }) => {
            return users.slice(offset, offset + limit);
        },
    },

    User: {
        // __resolveReference is called when another subgraph references a User
        // The gateway passes the key fields (id) as the "reference" parameter
        __resolveReference: (reference) => {
            return users.find(user => user.id === reference.id);
        },
    },
};