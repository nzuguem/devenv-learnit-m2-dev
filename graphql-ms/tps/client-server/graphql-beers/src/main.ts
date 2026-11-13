import { graphql, GraphQLSchema } from 'graphql';
import { GET_USER, GET_USERS_WITH_BEERS } from './operations';

// Exécute les opérations du TP directement sur le schéma, sans couche HTTP
export async function main(schema: GraphQLSchema) {
    const user = await graphql({
        schema,
        source: GET_USER,
        variableValues: { name: "pores" },
    });
    console.log('GetUser(pores):', JSON.stringify(user, null, 2));

    const usersWithBeers = await graphql({
        schema,
        source: GET_USERS_WITH_BEERS,
    });
    console.log('GetUsersWithBeers:', JSON.stringify(usersWithBeers, null, 2));
}
