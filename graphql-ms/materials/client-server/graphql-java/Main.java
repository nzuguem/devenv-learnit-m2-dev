///usr/bin/env jbang "$0" "$@" ; exit $?
//JAVA 25+
//DEPS com.graphql-java:graphql-java:24.3

import graphql.ExecutionInput;
import graphql.GraphQL;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;

import java.util.Map;

import static graphql.schema.idl.RuntimeWiring.newRuntimeWiring;

void main(String[] args) {

    var name = args.length > 0 ? args[0] : "Kevin";

    var schema = """
    type Query {
        hello(name: String!): String
    }
    """;

    var schemaParser = new SchemaParser();
    var typeDefinitionRegistry = schemaParser.parse(schema);

    var runtimeWiring = newRuntimeWiring()
            .type("Query", builder -> builder.dataFetcher("hello",
                    env -> "Hello " + env.<String>getArgument("name") + " 😉 !"))
            .build();

    var schemaGenerator = new SchemaGenerator();
    var graphQLSchema = schemaGenerator.makeExecutableSchema(typeDefinitionRegistry, runtimeWiring);

    var build = GraphQL.newGraphQL(graphQLSchema).build();

    var executionInput = ExecutionInput.newExecutionInput()
            .query("""
            query Hello($name: String!) {
                hello(name: $name)
            }
            """)
            .variables(Map.of("name", name))
            .build();

    var executionResult = build.execute(executionInput);

    IO.println(executionResult.toSpecification());
}
