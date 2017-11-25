import companyModel from "../../models/Company";
import { companyType } from "./company";
import {
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
    GraphQLInputObjectType
} from "graphql";

export const designationType = new GraphQLObjectType({
    name: "Designation",
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLID)},
        company: {
            type: new GraphQLNonNull(companyType),
            resolve: (designation) => {
                return companyModel.findById(designation.company).exec();
            }
        },
        name: {type: new GraphQLNonNull(GraphQLString)}
    })
});

export const designationInputType = new GraphQLInputObjectType({
    name: "DesignationInput",
    fields: {
        company: {type: GraphQLID},
        name: {type: GraphQLString}
    }
});