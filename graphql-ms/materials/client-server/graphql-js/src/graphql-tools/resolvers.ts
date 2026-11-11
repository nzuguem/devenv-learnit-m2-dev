import { GraphQLResolveInfo } from "graphql";
import { GraphQLContext, Message, MessageInput } from "../types";
import { fakeDatabase } from "../database";
import { createPubSub } from "graphql-yoga";

export const MESSAGE_ADDED = 'MESSAGE_ADDED';
const pubSub = createPubSub()
export const resolvers = {
  Query: {
    getMessage(parent: undefined, args: {id: string}, context: GraphQLContext, info: GraphQLResolveInfo): Message | null {
        return fakeDatabase[args.id];
    },
    getMessages(parent: undefined, args: undefined, context: GraphQLContext, info: GraphQLResolveInfo): Message[] {
        return Object.values(fakeDatabase);
    }
  },
  Channel: {
    // How to Fix 'Union Type' Resolution Errors in GraphQL
    // https://oneuptime.com/blog/post/2026-01-24-graphql-union-type-resolution-errors/view
    __resolveType(obj: { content: any; author: any; }, contextValue: any, info: any){
          console.log("__resolveType", obj)
          if(obj.content || obj.author) {
            return 'Message';
          }
          return null;
        },
  },
  Mutation: {
    createMessage(parent: undefined, args: { input: MessageInput }, context: GraphQLContext, info: GraphQLResolveInfo): Message {
        const id = String(Object.keys(fakeDatabase).length + 1)
        const message: Message = { id, content: args.input.content, author: args.input.author}
        fakeDatabase[id] = message
        pubSub.publish(MESSAGE_ADDED, message)
        return message
    },
    updateMessage(parent: undefined, args: { id: string, input: MessageInput }, context: GraphQLContext, info: GraphQLResolveInfo): Message | null {
        const message = fakeDatabase[args.id]
        Object.assign(message, args.input)
        return message
    }
  },
  Message: {
      content(parent: Message, args: undefined, context: GraphQLContext, info: GraphQLResolveInfo): string | undefined {
          return `${parent.content} 🎃🎃`;
      }
  },
  Subscription: {
    messageAdded: {
      subscribe: () => pubSub.subscribe(MESSAGE_ADDED),
      resolve: (message: Message) => message
    },
  }
}