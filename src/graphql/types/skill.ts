import skillModel from "../../models/Skill";
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

export const skillType = new GraphQLObjectType({
    name: "Skill",
    fields: {
        _id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: GraphQLString}
    }
});

export const skillInputType = new GraphQLInputObjectType({
    name: "SkillInput",
    fields: {
        name: {type: GraphQLString}
    }
});