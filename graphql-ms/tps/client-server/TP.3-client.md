# 📘 Cahier d'exercices — TP 3 : Écrire un client GraphQL

## 🎯 Objectifs

À la fin de ce TP, vous saurez :
- consommer une API GraphQL depuis du code applicatif ;
- envoyer des opérations avec des **variables**, sans concaténer de valeurs dans la requête ;
- distinguer une **erreur GraphQL** (le serveur répond avec `errors`) d'une **erreur réseau** (le serveur ne répond pas).

**Légende de difficulté :** 🟢 facile · 🟡 intermédiaire · 🔴 avancé

## 🧰 Matériel fourni

Le projet [`graphql-beers`](graphql-beers) avec le serveur du [TP 2](TP.2-server.md), et le squelette [`client.ts`](graphql-beers/src/client.ts). Les opérations à envoyer sont dans [`operations.ts`](graphql-beers/src/operations.ts).

## 🧗🏽 Procédure

1. Choisissez une bibliothèque cliente : [liste des clients JavaScript](https://graphql.org/community/tools-and-libraries/?tags=client&tags=javascript).
   [**graphql-request**](https://github.com/graffle-js/graffle) est **déjà installé** et suffit pour ce TP. Pour une autre bibliothèque, installez-la avec `npm install <paquet>`.

2. Implémentez le client dans [`client.ts`](graphql-beers/src/client.ts) :
   1. 🟢 Envoyez `GET_USER` avec la variable `name` (par exemple `"pores"`), puis affichez le résultat avec `console.log`.
   2. 🟢 Envoyez `GET_USERS_WITH_BEERS`, puis affichez, pour chaque utilisateur, ses bières et ses favorites.
   3. 🟡 Utilisez l'URL de la constante `GRAPHQL_URL` (modifiable avec la variable d'environnement du même nom).
   4. 🟡 Gérez les erreurs : affichez un message clair si le serveur renvoie des erreurs GraphQL, et un autre s'il est injoignable.

3. Lancez le serveur dans un terminal :

   ```bash
   npm run tp:server
   ```

4. Lancez le client dans un autre terminal :

   ```bash
   npm run tp:client
   ```

## ✅ Critères de réussite

- Le client affiche l'utilisateur `pores` (année 2000), puis les 3 utilisateurs avec leurs bières. `ulrich` n'en a aucune.
- Serveur arrêté, le client affiche un message d'erreur compréhensible, sans trace de pile brute.

## 💡 Indices

- Avec graphql-request : `new GraphQLClient(url)`, puis `client.request(document, variables)`.
- Une réponse GraphQL contient `data` et/ou `errors`. Selon la bibliothèque, `errors` est renvoyé tel quel ou levé sous forme d'exception (`ClientError` pour graphql-request).
- Typez la réponse selon la **sélection** demandée (`request<MonType>(...)`), pas selon tout le schéma.

## 🚀 Pour aller plus loin

1. 🟡 Écrivez le même client **sans bibliothèque**, avec `fetch` : que fait exactement la bibliothèque pour vous ?
2. 🟡 Factorisez les champs communs dans un **fragment** (`fragment BeerFields on Beer`).
3. 🔴 Si vous avez fait la mutation `addBeer` du TP 1, appelez-la depuis le client, puis relisez l'utilisateur.

## 🤖 Avec un agent

Après avoir essayé par vous-même, comparez votre solution à celle d'un agent :

```text
Implémente un client d'API GraphQL dans @src/client.ts qui consomme l'API définie par @src/schema.graphql.
Il envoie les opérations de @src/operations.ts avec des variables, affiche les résultats avec console.log,
et distingue les erreurs GraphQL des erreurs réseau. Utilise graphql-request.
```

Quelles différences voyez-vous avec votre code ? Lesquelles sont des améliorations ?
