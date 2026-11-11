import { GraphQLID, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLResolveInfo, GraphQLSchema, GraphQLString } from "graphql";
import { GraphQLContext, Message, MessageInput } from "../types";
import { fakeDatabase } from "../database";

const MessageInputType = new GraphQLInputObjectType({
  name: 'MessageInput',
  fields: {
    content: { type: GraphQLString },
    author: { type: GraphQLString },
  },
});

const MessageType = new GraphQLObjectType({
  name: 'Message',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      // OPTIONNEL
      /* resolve: (
        parent: Message,
        args: {},
        context: Context,
        info: GraphQLResolveInfo
      ) => {
        return parent.id;
      } */
    },
    content: {
      type: GraphQLString,
      // OPTIONNEL
      resolve: (
        parent: Message,
        args: {},
        context: GraphQLContext,
        info: GraphQLResolveInfo
      ) => {
        return parent.content;
      }
    },
    author: {
      type: GraphQLString,
      // OPTIONNEL
      resolve: (
        parent: Message,
        args: {},
        context: GraphQLContext,
        info: GraphQLResolveInfo
      ) => {
        return parent.author;
      }
    },
  },
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getMessage: {
      type: MessageType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (
        parent: undefined,
        args: { id: string },
        context: GraphQLContext,
        info: GraphQLResolveInfo
      ): Message | null => {
        return fakeDatabase[args.id];
      },
    },
    getMessages: {
      type: new GraphQLList(MessageType),
      resolve: (
        parent: undefined,
        args: {},
        context: GraphQLContext,
        info: GraphQLResolveInfo
      ): Message[] => {
        return Object.values(fakeDatabase);
      },
    },
  },
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createMessage: {
      type: MessageType,
      args: {
        input: { type: MessageInputType },
      },
      resolve: (
        parent: undefined,
        args: { input: MessageInput },
        context: GraphQLContext,
        info: GraphQLResolveInfo
      ): Message => {
        const id = String(Object.keys(fakeDatabase).length + 1)
        const message: Message = { id, content: args.input.content, author: args.input.author}
        fakeDatabase[id] = message
        return message
      },
    },
    updateMessage: {
      type: MessageType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        input: { type: MessageInputType },
      },
      resolve: (
        parent: undefined,
        args: { id: string; input: MessageInput },
        context: GraphQLContext,
        info: GraphQLResolveInfo
      ): Message | null => {
        const message = fakeDatabase[args.id]
        Object.assign(message, args.input)
        return message
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
