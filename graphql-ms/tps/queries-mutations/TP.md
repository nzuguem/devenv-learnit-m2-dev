# 📘 Cahier d'exercices — Queries & Mutations

## 🎯 Objectifs

À la fin de ce TP, vous saurez :
- lire un schéma GraphQL (SDL) et le parcourir comme un **graphe d'objets** ;
- écrire des **queries** simples puis imbriquées, en sélectionnant uniquement les champs utiles ;
- utiliser des **arguments** pour filtrer et paginer les résultats ;
- écrire des **mutations** avec des types `input`, et choisir les champs retournés.

## 🧰 Outils

| Besoin | Outil |
|---|---|
| Visualiser un schéma | [**GraphQL Voyager**](https://graphql-kit.com/graphql-voyager/) |
| Exécuter des requêtes | L'IDE GraphiQL de chaque API (liens ci-dessous) ou [**Apollo Sandbox**](https://studio.apollographql.com/sandbox/explorer), en renseignant l'URL de l'endpoint |

> 💡 Dans GraphiQL ou Apollo Sandbox, `Ctrl` + `Espace` déclenche l'**autocomplétion** à partir du schéma. Le panneau **Docs** (ou *Schema*) permet de parcourir les types et leurs descriptions.

**Légende de difficulté :** 🟢 facile · 🟡 intermédiaire · 🔴 avancé

---

## 🗺 Visualisation des différents SDL

Avant d'exécuter des requêtes sur une API GraphQL, il faut prendre connaissance de son graphe d'objets ([*Thinking in Graphs*](https://graphql.org/learn/thinking-in-graphs/)).

[**GraphQL Voyager**](https://github.com/graphql-kit/graphql-voyager) est un outil open source qui représente n'importe quelle API GraphQL sous forme de graphe interactif.

Dans 3 onglets de votre navigateur, ouvrez **GraphQL Voyager**, cliquez sur **Change Schema**, choisissez l'onglet **SDL** et collez le contenu du fichier de schéma correspondant :

| API | Schéma |
|---|---|
| [Rick and Morty API](https://rickandmortyapi.com/) | [rick-and-morty-api.schema.graphql](rick-and-morty-api.schema.graphql) |
| [Star Wars API](https://github.com/graphql/swapi-graphql) | [swapi.schema.graphql](swapi.schema.graphql) |
| [GraphQL Zero](https://graphqlzero.almansi.me/) | [graphqlzero.schema.graphql](graphqlzero.schema.graphql) |

**Questions d'observation** (à l'oral, sans requête) :
1. Quel est le type racine des requêtes de chaque API ? Laquelle ne s'appelle pas `Query` ?
2. Laquelle de ces API expose un type `Mutation` ?
3. Dans SWAPI, à quoi servent les types `…Connection` et `…Edge` qui entourent les listes ?
4. Dans GraphQL Zero, quelle différence voyez-vous entre `CreatePostInput` et `UpdatePostInput` ? Pourquoi ?

---

## 🧗🏽 Exécution des queries & mutations

> Pour chaque exercice, les champs attendus sont indiqués après le symbole →.

### 👽 API Rick and Morty

- **IDE / Endpoint :** https://rickandmortyapi.com/graphql
- **Pagination :** par numéro de page (`page: Int`), 20 résultats par page. Le champ `info { count pages next prev }` décrit la pagination.
- **Filtres :** les champs de `filter` font une recherche **partielle** et **insensible à la casse**.

1. 🟢 Récupérer le statut du personnage d'id `1` → `name`, `status`
2. 🟢 Lister les épisodes de la 3ᵉ page → `name`, `episode`
3. 🟢 Récupérer la localisation nommée `Abadango` → `id`, `name`, `type`, `dimension`
4. 🟢 Lister les personnages de genre féminin (`Female`) → `id`, `name`, ainsi que le nombre total de résultats et de pages
5. 🟡 Lister les personnages décédés (`Dead`) de l'espèce humaine (`Human`) → nombre total (`count`), `name`, nom de leur dernière localisation connue (`location.name`)
6. 🟡 Lister les lieux de type `Planet` et leur date de création → `name`, `created`
7. 🔴 Lister les lieux de dimension inconnue (`unknown`) et, pour chacun, ses résidents avec leur genre → `name` du lieu, `name` et `gender` des résidents
8. 🔴 Lister tous les personnages de l'épisode `1`, avec leur lieu d'origine → `name`, `origin.name`. Quelle est la différence entre `origin` et `location` ?

### 🌌 Star Wars API (SWAPI)

- **IDE :** https://graphql.org/swapi-graphql/
- **Endpoint :** https://swapi-graphql.netlify.app/graphql
- **Pagination :** de type *Relay* (par curseur). Les listes sont des `…Connection` qui acceptent les arguments `first`, `after`, `last` et `before`, et exposent `totalCount` et `pageInfo`.
- **Identifiants :** chaque ressource accepte un identifiant numérique (`planetID`, `personID`, `filmID`…) ou l'`id` global du nœud.

> ⚠️ Le déploiement public de SWAPI renvoie parfois `null` sur certains champs (`height`, `model`, `homeworld`…) à cause d'un problème de données côté serveur. Si votre requête est **valide** (aucune entrée dans `errors`) et que les noms et les titres remontent, considérez-la comme juste.

1. 🟢 Récupérer la planète `1` → `name`, `climates`, `terrains`, `population`
2. 🟢 Lister les 5 premiers films → `title`
3. 🟢 Récupérer la taille et le nom de la personne `14` → `name`, `height`
4. 🟢 Récupérer le vaisseau (`starship`) `9` → `name`, `model`, `manufacturers`
5. 🟢 Lister les 3 premières espèces (*species*) → `name`, `classification`
6. 🟡 Récupérer le film `5` et ses 3 premiers personnages → `title` du film, `name` des personnages
7. 🟡 Lister les 3 premiers véhicules et leurs pilotes → `name` du véhicule, `name` des pilotes
8. 🟡 Lister les 5 premiers personnages et leur espèce → `name`, `species.name`. Pourquoi `species` vaut-il `null` pour certains d'entre eux ?
9. 🔴 Récupérer la planète d'origine (`homeworld`) de la personne `1`, tous les résidents de cette planète et les films dans lesquels ils apparaissent → `name` de la planète, `name` des résidents, `title` des films
10. 🔴 Lister tous les vaisseaux apparaissant dans le film `1` → `name`, `model`, `starshipClass`, `cargoCapacity`
11. 🔴 Lister tous les films, leur réalisateur et les 2 premiers personnages de chaque film avec leur taille → `title`, `director`, `name` et `height` des personnages
12. 🔴 Lister toutes les espèces avec leurs caractéristiques et leurs 2 premiers représentants → `name`, `classification`, `averageLifespan`, `language`, `name` des personnes

### 💽 GraphQL Zero

- **IDE / Endpoint :** https://graphqlzero.almansi.me/api
- **Données :** API fictive basée sur [JSONPlaceholder](https://jsonplaceholder.typicode.com/). Les écritures sont **simulées** : la réponse est cohérente, mais rien n'est enregistré.
- **Pagination :** via l'argument `options: { paginate: { page, limit } }` des listes.

1. 🟢 Créer un nouvel article (`Post`) → `id`, `title`, `body`
2. 🟢 Mettre à jour le titre de l'article `1` → `id`, `title`, `body`
3. 🟢 Supprimer l'article `1` → que renvoie la mutation ?
4. 🟡 Créer un nouvel utilisateur (`User`) avec son adresse (`address`) → `id`, `name`, `username`, `email`, `address.city`
5. 🟡 Ajouter un commentaire à un article → `id`, `name`, `email`, `body`, `post.id`. Le commentaire est-il rattaché à un article ? Regardez `CreateCommentInput` dans le schéma pour l'expliquer.
