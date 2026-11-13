import { GraphQLResolveInfo } from "graphql";
import { Context, Beer, User } from "./types";
import { beers, users } from "./database";

// Un resolver reçoit 4 arguments : (parent, args, context, info)
// - parent  : la valeur renvoyée par le resolver du champ parent (undefined pour les champs de Query)
// - args    : les arguments du champ, par exemple { name: "kevin" }
// - context : un objet partagé par tous les resolvers d'une même requête
// - info    : des informations sur l'exécution (nom du champ, chemin, schéma…)
//
// Un champ sans resolver renvoie la propriété du même nom de `parent` (resolver par défaut).
export const resolvers = {
    Query: {
        // TODO users(parent: undefined, args: {}, context: Context, info: GraphQLResolveInfo): User[]
        // TODO user(parent: undefined, args: { name: string }, context: Context, info: GraphQLResolveInfo): User | null
    },
    User: {
        // TODO beers(parent: User, args: { favorite?: boolean }, context: Context, info: GraphQLResolveInfo): Beer[]
    },
}
