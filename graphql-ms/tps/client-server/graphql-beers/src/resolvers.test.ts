// Tests du TP sur les resolvers : `npm run tp:test`
// Ne modifiez pas ce fichier : il décrit le résultat attendu.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { graphql } from 'graphql';
import { schema } from './schema';
import { GET_USER, GET_USERS_WITH_BEERS } from './operations';

async function execute(source: string, variableValues?: Record<string, unknown>) {
    const result = await graphql({ schema, source, variableValues });
    // graphql-js crée des objets sans prototype : on les convertit en objets JSON simples
    return JSON.parse(JSON.stringify(result));
}

test('GetUser renvoie le nom et l\'année de naissance', async () => {
    assert.deepEqual(await execute(GET_USER, { name: 'pores' }), {
        data: { user: { name: 'pores', yearOfBirth: 2000 } },
    });
});

test('GetUser renvoie null pour un utilisateur inconnu (pas une erreur)', async () => {
    assert.deepEqual(await execute(GET_USER, { name: 'inconnu' }), {
        data: { user: null },
    });
});

test('GetUsersWithBeers renvoie les bières, et les favorites via l\'alias', async () => {
    assert.deepEqual(await execute(GET_USERS_WITH_BEERS), {
        data: {
            users: [
                {
                    name: 'kevin',
                    beers: [
                        { name: 'Desperado', favorite: null },
                        { name: 'Monaco', favorite: true },
                    ],
                    favoriteBeers: [{ name: 'Monaco' }],
                },
                // ulrich n'a pas de bières : `beers` est une liste non-null ([Beer]!), donc []
                { name: 'ulrich', beers: [], favoriteBeers: [] },
                {
                    name: 'pores',
                    beers: [
                        { name: 'Monaco', favorite: null },
                        { name: 'Terenez', favorite: true },
                    ],
                    favoriteBeers: [{ name: 'Terenez' }],
                },
            ],
        },
    });
});

test('beers(favorite: false) renvoie les bières qui ne sont pas favorites', async () => {
    const source = `{ user(name: "kevin") { beers(favorite: false) { name } } }`;
    assert.deepEqual(await execute(source), {
        data: { user: { beers: [{ name: 'Desperado' }] } },
    });
});
