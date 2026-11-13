import { graphql, GraphQLSchema } from 'graphql';

// The selections use `... on Message` inline fragments: in the graphql-tools schema, the queries
// return the `Channel` interface, and the fragment is also valid where the field type is `Message`.

export async function main(schema: GraphQLSchema, rootValue?: unknown) {
    const result1 = await graphql({
        schema,
        rootValue,
        source: `
        {
            getMessage(id: "1") {
                id
                ... on Message {
                    author
                }
            }
            getMessages {
                ... on Message {
                    content
                    author
                }
            }
        }
      `,
    });
    console.log('Result 1:', JSON.stringify(result1, null, 2));

    const result2 = await graphql({
        schema,
        rootValue,
        source: `
        mutation {
            updateMessage(id: "1", input: {content: "Hello GraphQL", author: "Kevin"}) {
                id
                content
                author
            }

            createMessage(input: {content: "Hello GraphQL Tools", author: "Kevin NZUGUEM"}) {
                id
                content
            }
        }
      `,
    });
    console.log('Result 2:', JSON.stringify(result2, null, 2));

    const result3 = await graphql({
        schema,
        rootValue,
        source: `
        {
            getMessages {
                id
                ... on Message {
                    content
                    author
                }
            }
        }
      `,
    });
    console.log('Result 3:', JSON.stringify(result3, null, 2));

    // Unknown id: the resolver returns null instead of crashing
    const result4 = await graphql({
        schema,
        rootValue,
        source: `
        mutation {
            updateMessage(id: "999", input: {content: "Nobody"}) {
                id
            }
        }
      `,
    });
    console.log('Result 4:', JSON.stringify(result4, null, 2));
}

