import {createYoga} from "graphql-yoga"
import {createServer} from "node:http";
import { schema } from "./schema";
import { useOpenTelemetry } from "@envelop/opentelemetry";
import { defaultResource, resourceFromAttributes } from "@opentelemetry/resources";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { BatchSpanProcessor, NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express";
import { GraphQLInstrumentation } from "@opentelemetry/instrumentation-graphql";

// Register server-related instrumentation
registerInstrumentations({
    instrumentations: [
        new HttpInstrumentation(),
        new ExpressInstrumentation(),
        new GraphQLInstrumentation()
    ]
});
const resource = defaultResource().merge(
    resourceFromAttributes({
        [ATTR_SERVICE_NAME]: 'reviews',
    }),
);
const exporter = new OTLPTraceExporter();
const provider = new NodeTracerProvider({
    resource: resource,
    spanProcessors: [new BatchSpanProcessor(exporter)],
})
provider.register()

const handler = createYoga({
    schema,
    graphiql: false,
    plugins: [
        useOpenTelemetry(
            {
                resolvers: true,
                variables: true,
                result: true,
            },
            provider
        )
    ]
})
const server = createServer(handler)

server.listen(4003, () => {
    console.info('Reviews Subgraph GraphQL is running on http://localhost:4003/graphql')
})