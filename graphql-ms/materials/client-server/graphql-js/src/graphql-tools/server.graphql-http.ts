import { schema } from './schema';
import { createHandler } from 'graphql-http/lib/use/http';
import { createServer } from "node:http";

const handler = createHandler({ schema });
const server = createServer(handler);

server.listen(4001, () => {
  console.info('Server is running on http://localhost:4001/graphql')
})