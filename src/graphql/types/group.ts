import companyModel from "../../models/Company";
import userModel from "../../models/User";
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

export const groupType = new GraphQLObjectType({
    name: "Group",
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLID)},
        company: {
            type: companyType,
            resolve: (group) => {
                return companyModel.findById(group.company).exec();
            }
        },
        name: {type: GraphQLString},
        members: {
            type: new GraphQLList(userType),
            resolve: (user) => {
                return userModel.find({_id: {$in: user.members}}).exec();
            }
        }
    })
});
export const groupInputType = new GraphQLInputObjectType({
    name: "GroupInput",
    fields: {
        company: {type: GraphQLID},
        name: {type: GraphQLString},
        members: {type: new GraphQLList(GraphQLID)}
    }
});