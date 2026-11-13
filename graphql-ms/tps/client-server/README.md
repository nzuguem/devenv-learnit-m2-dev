# 🍺 TP Client / Serveur GraphQL — `graphql-beers`

Fil rouge : vous construisez, étape par étape, une API GraphQL qui expose des utilisateurs et leurs bières.
Le schéma et les données vous sont fournis. Vous écrivez le code qui les relie, puis la couche HTTP, puis un client.

```text
  TP 1 : resolvers          TP 2 : serveur HTTP           TP 3 : client
  schéma + données   ──►   POST /graphql (port 4000)  ◄──  graphql-request…
```

| # | Énoncé | Ce que vous écrivez | Validation |
|---|---|---|---|
| 1 | [Construction de resolvers](TP.1-resolvers.md) | `src/resolvers.ts` | `npm run tp:test` |
| 2 | [Couche HTTP](TP.2-server.md) | `src/server.ts` | IDE GraphQL dans le navigateur, `curl` |
| 3 | [Client GraphQL](TP.3-client.md) | `src/client.ts` | `npm run tp:client` |

Les TP s'enchaînent dans cet ordre : chacun s'appuie sur le précédent, dans le même projet [`graphql-beers`](graphql-beers).

## 🧰 Le projet

```bash
cd graphql-beers
npm install
```

| Fichier | Rôle | À modifier ? |
|---|---|---|
| `src/schema.graphql` | Le schéma (SDL) : types `Query`, `User`, `Beer` | Non (sauf bonus) |
| `src/database.ts` | Les données en mémoire | Non |
| `src/types.ts` | Les types TypeScript des données | Non |
| `src/schema.ts` | Charge le SDL et lui attache les resolvers (`graphql-tools`) | Non |
| `src/operations.ts` | Les opérations GraphQL qui doivent fonctionner à la fin | Non |
| `src/resolvers.test.ts` | Les tests du TP 1 | Non |
| `src/resolvers.ts` | Les resolvers | **TP 1** |
| `src/server.ts` | Le serveur HTTP | **TP 2** |
| `src/client.ts` | Le client | **TP 3** |

## 🔌 Ports

| Port | Usage |
|---|---|
| 4000 | Votre serveur GraphQL (`npm run tp:server`) |
| 4001 | Ruru, l'IDE GraphQL à lancer à part si vous choisissez `graphql-http` |
