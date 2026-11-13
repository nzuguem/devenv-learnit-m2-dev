import { GraphQLID, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLResolveInfo, GraphQLSchema, GraphQLString } from "graphql";
import { GraphQLContext, Message, MessageInput } from "../types";
import { messageRepository } from "../database";

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
        return messageRepository.findById(args.id);
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
        return messageRepository.findAll();
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
        args: { input?: MessageInput },
        context: GraphQLContext,
        info: GraphQLResolveInfo
      ): Message => {
        return messageRepository.create(args.input);
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
        args: { id: string; input?: MessageInput },
        context: GraphQLContext,
        info: GraphQLResolveInfo
      ): Message | null => {
        return messageRepository.update(args.id, args.input);
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
