import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInputObjectType
} from "graphql";

export const profile = new GraphQLObjectType({
    name: "Profile",
    fields: () => ({
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        gender: { type: GraphQLString },
        location: { type: GraphQLString },
        portfolio: {type: GraphQLString},
        picture: {type: GraphQLString}
    })
});

export const profileInput = new GraphQLInputObjectType({
    name: "ProfileInput",
    fields: () => ({
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        gender: { type: GraphQLString },
        location: { type: GraphQLString },
        portfolio: {type: GraphQLString},
        picture: {type: GraphQLString}
    })
});