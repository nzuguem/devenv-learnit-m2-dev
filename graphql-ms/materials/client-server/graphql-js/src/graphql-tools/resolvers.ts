import { GraphQLResolveInfo } from "graphql";
import { GraphQLContext, Message, MessageInput } from "../types";
import { messageRepository } from "../database";
import { createPubSub } from "graphql-yoga";

export const MESSAGE_ADDED = 'MESSAGE_ADDED';
const pubSub = createPubSub<{ [MESSAGE_ADDED]: [Message] }>()
export const resolvers = {
  Query: {
    getMessage(parent: undefined, args: {id: string}, context: GraphQLContext, info: GraphQLResolveInfo): Message | null {
        return messageRepository.findById(args.id);
    },
    getMessages(parent: undefined, args: undefined, context: GraphQLContext, info: GraphQLResolveInfo): Message[] {
        return messageRepository.findAll();
    }
  },
  Channel: {
    // How to Fix 'Union Type' Resolution Errors in GraphQL
    // https://oneuptime.com/blog/post/2026-01-24-graphql-union-type-resolution-errors/view
    // Discriminate on the shape of the object (its keys), not on the truthiness of its values:
    // a message created without content nor author is still a Message.
    __resolveType(obj: object, contextValue: GraphQLContext, info: GraphQLResolveInfo) {
          console.log("__resolveType", obj)
          if ('content' in obj || 'author' in obj) {
            return 'Message';
          }
          return null;
        },
  },
  Mutation: {
    createMessage(parent: undefined, args: { input?: MessageInput }, context: GraphQLContext, info: GraphQLResolveInfo): Message {
        const message = messageRepository.create(args.input)
        pubSub.publish(MESSAGE_ADDED, message)
        return message
    },
    updateMessage(parent: undefined, args: { id: string, input?: MessageInput }, context: GraphQLContext, info: GraphQLResolveInfo): Message | null {
        return messageRepository.update(args.id, args.input)
    }
  },
  Message: {
      content(parent: Message, args: undefined, context: GraphQLContext, info: GraphQLResolveInfo): string | undefined {
          return parent.content ? `${parent.content} 🎃🎃` : parent.content;
      }
  },
  Subscription: {
    messageAdded: {
      subscribe: () => pubSub.subscribe(MESSAGE_ADDED),
      resolve: (message: Message) => message
    },
  }
}
