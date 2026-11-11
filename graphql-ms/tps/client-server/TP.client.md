# 📘 Cahier d'exercices

## Ecrire un composant client GraphQL

### Matériels fournis

Le projet de TP sur les resolvers + serveur

### Objectif

Votre mission consiste à écrire un composant applicatif qui va consommer une API GraphQL (celle du TP sur le serveur GraphQL).

Vous êtes libres de sélectionner le framework ou la librairie JavaScript de votre choix : https://graphql.org/community/tools-and-libraries/?tags=client&tags=javascript

### Procédure à suivre

1. Positionnez-vous dans le répertoire du projet
```shell
cd graphql-beers
```
2. Installer la dépendance du framework choisi
```shell
npm install <PACKAGE_NPM>
```
3. Implémenter le client GraphQL dans le fichier [client.ts](./graphql-beers/src/client.ts)

Le client doit envoyer quelques opérations présentes dans [main.ts](./graphql-beers/src/main.ts), et les résultats doivent être affichés via des `console.log`.

4. Lancement du serveur HTTP
```shell
npm run tp:server
```
5. Tester
```shell
npm run tp:client
```

### Prompt Agent 🤖

```
Implémente un client d'API GraphQL dans @src/client.ts qui va consommer l'API GraphQL définie par le schéma @src/schema.graphql. Ce client devra soumettre quelques requêtes présentes dans @src/main.ts. Utilise la bibliothèque JavaScript la plus intuitive pour les étudiants.
```