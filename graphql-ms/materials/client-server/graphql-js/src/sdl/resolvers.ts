import { messageRepository } from "../database"
import { Message, MessageInput } from "../types"

// With buildSchema + rootValue, each root field is a function that receives (args, context, info)
export const rootResolvers = {
    getMessage: (args: { id: string }): Message | null => messageRepository.findById(args.id),
    getMessages: (): Message[] => messageRepository.findAll(),
    createMessage: (args: { input?: MessageInput }): Message => messageRepository.create(args.input),
    updateMessage: (args: { id: string, input?: MessageInput }): Message | null =>
        messageRepository.update(args.id, args.input),
}
