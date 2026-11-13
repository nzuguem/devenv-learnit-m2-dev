import { GET_USER, GET_USERS_WITH_BEERS } from "./operations";

const GRAPHQL_URL = process.env.GRAPHQL_URL ?? "http://localhost:4000/graphql";

export async function main() {
  // TODO : envoyer GET_USER (avec la variable `name`) puis GET_USERS_WITH_BEERS à GRAPHQL_URL,
  // et afficher les résultats avec console.log : voir TP.3-client.md
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
