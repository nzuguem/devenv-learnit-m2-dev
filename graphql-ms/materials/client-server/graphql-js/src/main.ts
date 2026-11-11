import { graphql, GraphQLSchema } from 'graphql';

export async function main(schema: GraphQLSchema, rootValue?: unknown) {
    const result1 = await graphql({
        schema,
        rootValue,
        source: `
        {
            getMessage(id: "1") {
                id
                author
            }
            getMessages {
                content
                author
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
                content
                author
            }
        }
      `,
    });
    console.log('Result 3:', JSON.stringify(result3, null, 2));
}

