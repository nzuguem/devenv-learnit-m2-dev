// Opérations GraphQL du TP, partagées par le runtime (main.ts), les tests (resolvers.test.ts)
// et le client (client.ts). Elles doivent toutes s'exécuter sans erreur à la fin du TP.

// Un utilisateur par son nom : la valeur est passée en variable ($name), pas écrite dans la requête
export const GET_USER = /* GraphQL */ `
  query GetUser($name: ID!) {
    user(name: $name) {
      name
      yearOfBirth
    }
  }
`;

// Tous les utilisateurs avec toutes leurs bières, et seulement leurs favorites.
// Le même champ (`beers`) est demandé deux fois avec des arguments différents :
// sans l'alias `favoriteBeers`, la requête serait invalide (conflit de champs).
export const GET_USERS_WITH_BEERS = /* GraphQL */ `
  query GetUsersWithBeers {
    users {
      name
      beers {
        name
        favorite
      }
      favoriteBeers: beers(favorite: true) {
        name
      }
    }
  }
`;
