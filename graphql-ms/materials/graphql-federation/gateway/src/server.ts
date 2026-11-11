import {createYoga} from "graphql-yoga"
import {createServer} from "node:http";
import {ApolloGateway, IntrospectAndCompose} from "@apollo/gateway";
import {useApolloFederation} from "@envelop/apollo-federation";
import {OTLPTraceExporter} from "@opentelemetry/exporter-trace-otlp-http";
import {defaultResource, resourceFromAttributes} from "@opentelemetry/resources";
import {ATTR_SERVICE_NAME} from "@opentelemetry/semantic-conventions";
import { BatchSpanProcessor, NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express";
import { PRODUCTS_SUBGRAPH_SERVICE_BASE_URL, REVIEWS_SUBGRAPH_SERVICE_BASE_URL, USERS_SUBGRAPH_SERVICE_BASE_URL } from "./env";

async function gateway() {
    const gateway = new ApolloGateway({
        debug: true, // print query plans to stdout
        supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
                { name: 'users', url: `${USERS_SUBGRAPH_SERVICE_BASE_URL}/graphql` },
                { name: 'products', url: `${PRODUCTS_SUBGRAPH_SERVICE_BASE_URL}/graphql` },
                { name: 'reviews', url: `${REVIEWS_SUBGRAPH_SERVICE_BASE_URL}/graphql` },
            ],
        }),
    });
    await gateway.load();

    return createYoga({
        plugins: [
            useApolloFederation({
                gateway,
            }),
        ],
        graphiql: {
            title: 'GraphQL Federation Gateway (Yoga/Apollo)',
        },
    });
}

(async () => {
    // Register server-related instrumentation
    registerInstrumentations({
        instrumentations: [
            new HttpInstrumentation(),
            new ExpressInstrumentation()
        ]
    });
    const resource = defaultResource().merge(
        resourceFromAttributes({
            [ATTR_SERVICE_NAME]: 'gateway',
        }),
    );
    const exporter = new OTLPTraceExporter();
    const provider = new NodeTracerProvider({
        resource: resource,
        spanProcessors: [new BatchSpanProcessor(exporter)],
    })
    provider.register()

    const yogaInstance = await gateway();
    const server = createServer(yogaInstance);

    server.listen(4000, () => {
        console.info('Apollo Federation Gateway is running on http://localhost:4000/graphql')
    })
})();