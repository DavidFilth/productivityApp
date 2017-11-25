import companyModel from "../../models/Company";
import { companyType } from "./company";
import { userType } from "./user";
import {
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLList
} from "graphql";

export const masterGroupType = new GraphQLObjectType({
    name: "MasterGroup",
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: GraphQLString},
        members: {type: new GraphQLList(userType)},
        company: { 
            type: companyType,
            resolve: (masterGroup) => {
                companyModel.findById(masterGroup.company).exec;
            }
        }
    })
});

export const masterGroupInputType = new GraphQLInputObjectType({
    name: "MasterGroupInput",
    fields: () => ({
        company: {type: GraphQLID},
        name: {type: GraphQLString},
        members: {type: new GraphQLList(GraphQLID)}
    })
});