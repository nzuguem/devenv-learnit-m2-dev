import { graphql, GraphQLSchema } from 'graphql';

export async function main(schema: GraphQLSchema) {
    const result = await graphql({
        schema,
        source: `
        {
            user(name: "pores") {
                yearOfBirth
            }
            users {
                name
                beers {
                    name
                    favorite
                }
            }

            users {
                name
                beers(favorite: true) {
                    name
                }
            }
        }
      `,
    });
    console.log('Result:', JSON.stringify(result, null, 2));

    const result1 = await graphql({
        schema,
        source: `
        {
            users {
                name
                beers(favorite: true) {
                    name
                }
            }
        }
      `,
    });
    console.log('Result 1:', JSON.stringify(result1, null, 2));
}

