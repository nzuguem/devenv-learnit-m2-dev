# 📘 Cahier d'exercices — TP 2 : Ajouter une couche HTTP au serveur GraphQL

## 🎯 Objectifs

À la fin de ce TP, vous saurez :
- exposer un schéma GraphQL exécutable sur HTTP ;
- reconnaître la forme d'une requête *GraphQL over HTTP* (un `POST` vers `/graphql`, avec `query` et `variables`) ;
- utiliser un IDE GraphQL (GraphiQL, Apollo Sandbox, Ruru) et observer les échanges réseau.

**Légende de difficulté :** 🟢 facile · 🟡 intermédiaire · 🔴 avancé

## 🧰 Matériel fourni

Le projet [`graphql-beers`](graphql-beers) avec vos resolvers du [TP 1](TP.1-resolvers.md) (`npm run tp:test` doit être vert), et le squelette [`server.ts`](graphql-beers/src/server.ts).

## 🧗🏽 Procédure

1. Choisissez un framework :

   | Framework | Installation | IDE intégré |
   |---|---|---|
   | [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server/docs) | `npm install graphql-yoga` | GraphiQL sur http://localhost:4000/graphql |
   | [Apollo Server](https://www.apollographql.com/docs/apollo-server/getting-started) | `npm install @apollo/server` | Apollo Sandbox sur http://localhost:4000 |
   | [graphql-http](https://www.npmjs.com/package/graphql-http) | `npm install graphql-http` | Aucun : utilisez Ruru sur http://localhost:4001 (voir l'étape 3) |

2. Implémentez la couche HTTP dans [`server.ts`](graphql-beers/src/server.ts) :
   - **réutilisez** le `schema` exporté par `./schema` : il contient déjà vos resolvers ;
   - écoutez sur `PORT`, soit `4000` par défaut ;
   - exposez l'API sur le chemin `/graphql`.

3. Lancez le serveur :

   ```bash
   npm run tp:server
   ```

   Si vous avez choisi **graphql-http**, lancez aussi Ruru dans un autre terminal :

   ```bash
   npm run tp:server:graphql-http:ruru
   ```

4. Testez :
   1. 🟢 Ouvrez l'IDE de votre framework (tableau ci-dessus) et exécutez les opérations de [`operations.ts`](graphql-beers/src/operations.ts). Pour `GetUser`, renseignez la variable dans le panneau **Variables** : `{ "name": "kevin" }`.
   2. 🟢 Appelez l'API sans IDE :

      ```bash
      curl -s http://localhost:4000/graphql -H 'content-type: application/json' -d '{"query":"query($name: ID!) { user(name: $name) { name yearOfBirth } }","variables":{"name":"kevin"}}'
      ```

   3. 🟡 Dans les DevTools du navigateur (onglet **Réseau**), observez une requête envoyée par l'IDE : méthode, URL, en-têtes, corps et réponse.

## ✅ Critères de réussite

- Le `curl` renvoie `{"data":{"user":{"name":"kevin","yearOfBirth":1992}}}`.
- Les opérations de `operations.ts` s'exécutent dans l'IDE sans entrée `errors`.

## 💡 Indices

- Yoga et graphql-http fournissent un *handler* HTTP à brancher sur `createServer` de `node:http`. Apollo Server propose `startStandaloneServer`, qui crée le serveur pour vous.
- `Address already in use` : un autre serveur occupe déjà le port 4000 (un autre terminal, un autre TP…).

## 🚀 Pour aller plus loin

1. 🟢 Ajoutez un en-tête de réponse personnalisé, par exemple `X-Powered-By: graphql-beers`.
2. 🟡 Construisez un `context` par requête, par exemple l'utilisateur lu dans un en-tête `X-User`, et utilisez-le dans un resolver.
3. 🟡 Envoyez une query en `GET` (`/graphql?query=...`) : est-ce accepté ? Et une mutation en `GET` ? Pourquoi ?
4. 🔴 Changez de framework et comparez : quel code change, lequel reste identique ?
