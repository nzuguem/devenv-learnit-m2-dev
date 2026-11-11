import { createYoga } from "graphql-yoga"
import { schema } from './schema';
import { createServer } from "node:http";
import { helloPlugin, useYogaSignature } from "./plugins";
import { useRateLimiter } from "@envelop/rate-limiter";

const handler = createYoga({
    schema: schema,
    plugins: [
        helloPlugin,
        useYogaSignature(),
        useRateLimiter({
            identifyFn: context => {
              return "me"
            }
        })
    ]
})
const server = createServer(handler)

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})