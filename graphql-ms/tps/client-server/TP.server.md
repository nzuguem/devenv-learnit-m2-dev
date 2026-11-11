# 📘 Cahier d'exercices

## Rajouter une couche HTTP au serveur GraphQL

### Matériels fournis

Le projet de TP sur les resolvers

### Objectif

Votre mission consiste à rajouter une couche HTTP au serveur GraphQL actuel, en utilisant le framework de votre choix.

Choix possibles :
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/getting-started)
- [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server/docs)
- [GraphQL HTTP](https://www.npmjs.com/package/graphql-http)

### Procédure à suivre

1. Positionnez-vous dans le répertoire du projet
```shell
cd graphql-beers
```
2. Installer la dépendance du framework choisi
```shell
npm install <graphql-http | graphql-yoga | @apollo/server>
```
3. Implémenter la couche HTTP dans le fichier [server.ts](./graphql-beers/src/server.ts)
Le serveur HTTP doit écouter sur le port `4000`
4. Lancement du serveur HTTP
```shell
npm run tp:server

## Pour ceux / celles ayant choisis GraphQL HTTP, veuillez exécutez cette commande dans un autre terminal
npm run tp:server:graphql-http:ruru
```
5. Tester

- Ouvrir le client graphique dans votre navigateur
  - Apollo Server -> http://localhost:4000
  - GraphQL Yoga -> http://localhost:4000/graphql
  - GraphQL HTTP -> http://localhost:4001
- Executer les opérations GraphQL qui se trouvent dans [main.ts](./graphql-beers/src/main.ts)
- Inspecter le réseau avec les DevTools de votre navigateur


