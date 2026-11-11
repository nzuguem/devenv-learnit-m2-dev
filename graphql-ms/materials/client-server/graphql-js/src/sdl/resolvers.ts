import { fakeDatabase } from "../database"
import { Message } from "../types"

export const rootResolvers = {
    getMessage: (args: { id: string }): Message => fakeDatabase[args.id],
    getMessages: (): Message[] | null => Object.values(fakeDatabase),
    createMessage: (args: { input: Omit<Message, 'id'>}): Message => {
        const id = String(Object.keys(fakeDatabase).length + 1)
        const message: Message = { id, content: args.input.content, author: args.input.author}
        fakeDatabase[id] = message
        return message
    },
    updateMessage: (args: {id: string, input: Omit<Message, 'id'> }) : Message => {
        const message = fakeDatabase[args.id]
        Object.assign(message, args.input)
        return message
    }
}