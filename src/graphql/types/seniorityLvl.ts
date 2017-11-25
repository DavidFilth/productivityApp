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

export const seniorityLvlType = new GraphQLObjectType({
    name: "SeniorityLvl",
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLID)},
        company: {
            type: companyType,
            resolve: (seniorityLvl) => {
                return companyModel.findById(seniorityLvl.company).exec();
            }
        },
        name: {type: GraphQLString}
    })
});
export const seniorityLvlInputType = new GraphQLInputObjectType({
    name: "SeniorityLvlInput",
    fields: {
        company: {type: GraphQLID},
        name: {type: GraphQLString}
    }
});