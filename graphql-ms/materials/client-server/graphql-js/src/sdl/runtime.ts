import { main } from '../main';
import { schema } from './schema';
import { rootResolvers } from './resolvers';

main(schema, rootResolvers).catch((err) => {
  console.error(err);
  process.exit(1);
});

