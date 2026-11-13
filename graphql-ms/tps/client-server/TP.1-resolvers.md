# 📘 Cahier d'exercices — TP 1 : Construction de resolvers

## 🎯 Objectifs

À la fin de ce TP, vous saurez :
- relier un schéma GraphQL (SDL) à des données grâce aux **resolvers** ;
- utiliser les arguments d'un resolver : `parent`, `args`, `context`, `info` ;
- distinguer les resolvers de **Query** des resolvers de **champ** (ici `User.beers`) ;
- respecter la **nullabilité** déclarée dans le schéma (`User` vs `[Beer]!`).

**Légende de difficulté :** 🟢 facile · 🟡 intermédiaire · 🔴 avancé

## 🧰 Matériel fourni

Dans [`graphql-beers`](graphql-beers) (voir le [README](README.md) pour le rôle de chaque fichier) :
- le schéma [`schema.graphql`](graphql-beers/src/schema.graphql) ;
- les données en mémoire [`database.ts`](graphql-beers/src/database.ts) : un dictionnaire `users` et un dictionnaire `beers` **rangé par nom d'utilisateur** ;
- le chargement du schéma avec [graphql-tools](https://the-guild.dev/graphql/tools) dans [`schema.ts`](graphql-beers/src/schema.ts) ;
- les opérations à faire fonctionner dans [`operations.ts`](graphql-beers/src/operations.ts) et leurs tests dans [`resolvers.test.ts`](graphql-beers/src/resolvers.test.ts) ;
- le squelette à compléter : [`resolvers.ts`](graphql-beers/src/resolvers.ts).

## 🧗🏽 Procédure

1. Installez les dépendances :

   ```bash
   cd graphql-beers
   npm install
   ```

2. Lisez le schéma et les données, puis repérez ce qui ne correspond pas directement. Par exemple : où se trouvent les bières d'un utilisateur ?

3. Complétez [`resolvers.ts`](graphql-beers/src/resolvers.ts), dans cet ordre :
   1. 🟢 `Query.users` : tous les utilisateurs ;
   2. 🟢 `Query.user(name)` : un utilisateur par son nom ;
   3. 🟡 `User.beers` : les bières de l'utilisateur ;
   4. 🟡 `User.beers(favorite)` : seulement les favorites (`true`) ou seulement les autres (`false`).

4. Testez **après chaque resolver** :

   ```bash
   npm run tp:test      # les tests : ce qui est attendu, ce qui est obtenu
   npm run tp:runtime   # affiche les résultats bruts des opérations
   ```

## ✅ Critères de réussite

`npm run tp:test` affiche les 4 tests en vert (`✔`, `pass 4`, `fail 0`), et `npm run tp:runtime` n'affiche aucune entrée `errors`.

## 💡 Indices

- Un champ **sans resolver** renvoie la propriété du même nom de l'objet parent (*resolver par défaut*). Vous n'avez donc pas à écrire de resolver pour `User.name` ni `User.yearOfBirth`.
- Le resolver `User.beers` reçoit en `parent` l'utilisateur renvoyé par `Query.users` ou `Query.user`.
- `user(name: ID!): User` est **nullable** : un utilisateur inconnu doit donner `null`, pas une erreur.
- `beers: [Beer]!` est **non-null** : un utilisateur sans bières doit renvoyer `[]`. Regardez le cas de `ulrich`.
- Une bière sans propriété `favorite` n'est pas favorite.
- Lisez les messages d'erreur : `Cannot return null for non-nullable field…` indique précisément le resolver en cause.

## 🚀 Pour aller plus loin

1. 🟡 Ajoutez au schéma un champ calculé `age: Int!` sur `User`, puis son resolver.
2. 🟡 Ajoutez une query `beers: [String!]!` qui liste les noms de toutes les bières, sans doublon.
3. 🔴 Ajoutez une mutation `addBeer(user: ID!, name: String!, favorite: Boolean): User`.
