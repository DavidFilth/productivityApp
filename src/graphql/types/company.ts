import {
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
    GraphQLInputObjectType
} from "graphql";

export const companyType = new GraphQLObjectType({
    name: "company",
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        alias: {type: GraphQLString}
    })
});
export const companyInputType = new GraphQLInputObjectType({
    name: "companyInput",
    fields: {
        name: {type: GraphQLString },
        alias: {type: GraphQLString},
    }
});