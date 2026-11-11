import { Plugin } from 'graphql-yoga'
import { OnParseEventPayload } from '@envelop/core'
import { GraphQLContext } from '../types'

export const helloPlugin: Plugin = {
  onParse({ params }: OnParseEventPayload<GraphQLContext>) {
      console.log('Parse started!', { params })
      return ({ result }) => {
        console.log('Parse done!', { result })
      }
  },
  onExecute({ args }) {
    console.log('Execution started!', { args })

    return {
      onExecuteDone({ result }) {
        console.log('Execution done!', { result })
      }
    }
  }
}
export const useYogaSignature= (): Plugin => {
  return {
    onResponse({ response }) {
      response.headers.set('X-GraphQL-Server', 'Yoga')
    }
  }
}