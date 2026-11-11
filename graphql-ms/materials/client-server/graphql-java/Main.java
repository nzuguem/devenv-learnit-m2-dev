///usr/bin/env jbang "$0" "$@" ; exit $?
//JAVA 25+
//DEPS com.graphql-java:graphql-java:24.3

import graphql.ExecutionResult;
import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import graphql.schema.StaticDataFetcher;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;

import static graphql.schema.idl.RuntimeWiring.newRuntimeWiring;

void main() {

    var schema = "type Query{hello: String}";

    var schemaParser = new SchemaParser();
    var typeDefinitionRegistry = schemaParser.parse(schema);

    var runtimeWiring = newRuntimeWiring()
            .type("Query", builder -> builder.dataFetcher("hello", new StaticDataFetcher("world")))
            .build();

    var schemaGenerator = new SchemaGenerator();
    var graphQLSchema = schemaGenerator.makeExecutableSchema(typeDefinitionRegistry, runtimeWiring);

    var build = GraphQL.newGraphQL(graphQLSchema).build();
    var executionResult = build.execute("{hello}");

    IO.println(executionResult.getData().toString());
}