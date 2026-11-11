import { YogaInitialContext } from 'graphql-yoga';

export type Message = {
  id: string;
  content?: string;
  author?: string;
};

export type MessageInput = {
  content?: string;
  author?: string;
};

export type User = {
    id: string;
    email?: string
}

export interface GraphQLContext extends YogaInitialContext {
    user?: User
}