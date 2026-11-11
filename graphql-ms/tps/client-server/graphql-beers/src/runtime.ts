import { schema } from './schema';
import { main } from './main';

main(schema).catch((err) => {
  console.error(err);
  process.exit(1);
});


