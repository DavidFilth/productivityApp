import { DateType as GraphQLDate } from "./date";
import CompanyModel from "../../models/Company";
import userModel from "../../models/User";
import { companyType } from "./company";
import { userType } from "./user";
import {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList
} from "graphql";
import { resolve } from "dns";

export const conversationType = new GraphQLObjectType({
    name: "Conversation",
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLID)},
        conversationType: {type: new GraphQLNonNull(GraphQLString)},
        conversationName: {type: GraphQLString},
        company: {
            type: new GraphQLNonNull(companyType),
            resolve: (conversation) => {
                return CompanyModel.findById(conversation.company).exec();
            }
        },
        owner: {
            type: new GraphQLNonNull(userType),
            resolve: (conversation) => {
                return userModel.findById(conversation.owner).exec();
            }
        },
        participants: {
            type: new GraphQLList(userType),
            resolve: (conversation) => {
                return userModel.find({_id: {$in: conversation.participants}}).exec();
            }
        }
    })
});

export const conversationInputType = new GraphQLInputObjectType({
    name: "ConversationInput",
    fields: () => ({
        company: { type: GraphQLID },
        owner: { type: GraphQLID },
        conversationType: { type: GraphQLString },
        conversationName: { type: GraphQLString },
        participants: {type: new GraphQLList(GraphQLID)}
    })
});


