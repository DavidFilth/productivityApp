import companyModel from "../../models/Company";
import { companyType } from "./company";
import {
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
    GraphQLInputObjectType
} from "graphql";

export const empType = new GraphQLObjectType({
    name: "empType",
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLID)},
        company: {
            type: companyType,
            resolve: (empType) => {
                return companyModel.findById(empType.company).exec();
            }
        },
        name: {type: GraphQLString}
    })
});

export const empTypeInput = new GraphQLInputObjectType({
    name: "empTypeInput",
    fields: {
        company: {type: GraphQLID},
        name: {type: GraphQLString}
    }
});