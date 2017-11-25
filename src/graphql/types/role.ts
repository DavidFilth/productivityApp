import companyModel from "../../models/Company";
import { companyType } from "./company";
import {
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLInt
} from "graphql";

export const roleType = new GraphQLObjectType({
    name: "Role",
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: GraphQLString},
        alias: {type: GraphQLString},
        permissions: {type: GraphQLString},
        company: {
            type: companyType,
            resolve: (role) => {
                return companyModel.findById(role.company).exec();
            }
        }
    })
});

export const roleInputType = new GraphQLInputObjectType({
    name: "RoleInput",
    fields: {
        name: {type: GraphQLString},
        company: {type: GraphQLID},
        alias: {type: GraphQLString},
        permissions: {type: GraphQLString}
    }
});