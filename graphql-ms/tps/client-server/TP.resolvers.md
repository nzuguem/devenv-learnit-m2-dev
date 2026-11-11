# 📘 Cahier d'exercices

## Construction de resolvers

### Matériels fournis

Le projet de TP met à votre disposition les éléments suivants :

- Un schéma GraphQL (SDL) définissant les types, queries
- Un mécanisme de chargement du schéma utilisant la bibliothèque [graphql-tools](https://the-guild.dev/graphql/tools) pour rendre le schéma exécutable
- Des structures de données en mémoire (dictionnaires JavaScript) servant de base de données pour ce TP
- Un ensemble de requêtes GraphQL de test qui devront s'exécuter sans erreurs à l'issue du TP
- Un squelette de code pour faciliter l'écriture des resolvers

### Objectif

Votre mission consiste à implémenter les resolvers nécessaires pour que le schéma GraphQL devienne pleinement fonctionnel et que toutes les requêtes de test s'exécutent avec succès.

### Procédure à suivre

1. Positionnez-vous dans le répertoire du projet
```shell
cd graphql-beers
```
2. Installer des dépendances
```shell
npm install
```
3. Implémenter les resolvers

Complétez le code des resolvers dans les [fichiers fournis](graphql-beers/src/resolvers.ts) en vous appuyant sur :
- Le schéma SDL pour comprendre la structure des données attendues
- Les structures de données mises à disposition
- Les requêtes de test pour identifier les fonctionnalités à implémenter

4. Tester : exécutez la suite de tests pour valider votre implémentation

```shell
npm run tp:runtime
```

### ⚠️ Recommandations

- **Adoptez une approche incrémentale** : n'attendez pas d'avoir écrit tous les resolvers pour tester. Implémentez et testez au fur et à mesure.
- Analysez les messages d'erreur pour identifier précisément les resolvers manquants ou défectueux.
- Référez-vous à la documentation de GraphQL et [graphql-tools](https://the-guild.dev/graphql/tools) si nécessaire.