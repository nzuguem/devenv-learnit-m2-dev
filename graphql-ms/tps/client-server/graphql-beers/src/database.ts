import { Beer, User } from "./types";

export const users: Record<string, User> = {
    "kevin" : {name: "kevin", yearOfBirth: 1992},
    "ulrich": {name: "ulrich", yearOfBirth: 1992},
    "pores": {name: "pores", yearOfBirth: 2000}
};

export const beers: Record<string, Beer[]> = {
    "kevin" : [{name: "Desperado"}, {name: "Monaco", favorite: true}],
    "pores": [{name: "Monaco"}, {name: "Terenez", favorite: true}],
}