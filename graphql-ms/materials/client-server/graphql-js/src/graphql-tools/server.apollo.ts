import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { schema } from './schema';

async function start() {
    const serverAndHandler = new ApolloServer({ schema });
    const { url } = await startStandaloneServer(serverAndHandler, {
      listen: { port: 4003 },
    });
    console.log(`🚀  Server ready at: ${url}`);
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});