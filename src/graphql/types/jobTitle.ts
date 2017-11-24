import companyModel from "../../models/Company";
import { companyType } from "./company";

import {
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
    GraphQLInputObjectType
} from "graphql";

export const jobTitleType = new GraphQLObjectType({
    name: "jobTitle",
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLID)},
        company: {
            type: companyType,
            resolve: (jobTitle) => {
                return companyModel.findById(jobTitle.company).exec();
            }
        },
        name: {type: GraphQLString}
    })
});

export const jobTitleInputType = new GraphQLInputObjectType({
    name: "jobTitleInput",
    fields: {
        company: {type: GraphQLID},
        name: {type: GraphQLString}
    }
});