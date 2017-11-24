import { addMockFunctionsToSchema } from "graphql-tools";
import { GraphQLObjectType, GraphQLSchema } from "graphql";
import mocks from "./mocks";
import mutations from "./mutations";
import queries from "./queries";

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: queries
    }),
    mutation: new GraphQLObjectType({
        name: "Mutation",
        fields: mutations
    })
});
addMockFunctionsToSchema({schema, mocks});

export default schema;