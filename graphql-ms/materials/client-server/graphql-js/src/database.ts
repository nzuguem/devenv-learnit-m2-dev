import { Message, MessageInput } from "./types";

export const fakeDatabase: Record<string, Message> = {
    "1" : {id: "1", content: "Hello GraphQL JS", author: "Kevin NZUGUEM"}
};

let nextId = Object.keys(fakeDatabase).length + 1;

// Single data-access layer shared by the 3 schema styles (sdl, code, graphql-tools):
// the resolvers only map GraphQL arguments to these calls.
export const messageRepository = {
    findById(id: string): Message | null {
        return fakeDatabase[id] ?? null;
    },

    findAll(): Message[] {
        return Object.values(fakeDatabase);
    },

    create(input: MessageInput = {}): Message {
        const id = String(nextId++);
        const message: Message = { id, content: input.content, author: input.author };
        fakeDatabase[id] = message;
        return message;
    },

    update(id: string, input: MessageInput = {}): Message | null {
        const message = fakeDatabase[id];
        if (!message) {
            return null;
        }
        Object.assign(message, input);
        return message;
    },
};
