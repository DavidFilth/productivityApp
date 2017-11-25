import conversationModel from "../../models/Conversation";
import { conversationType } from "./conversation";
import userModel from "../../models/User";
import { userType } from "./user";
import { DateType } from "./date";
import {
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
    GraphQLInputObjectType
} from "graphql";

export const messageType = new GraphQLObjectType({
    name: "Message",
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLID)},
        user: {
            type: userType,
            resolve: (message) => {
                return userModel.findById(message.user).exec();
            }
        },
        conversation: {
            type: conversationType,
            resolve: (message) => {
                return conversationModel.findById(message.conversation).exec();
            }
        },
        msgContent: {type: GraphQLString},
        msgType: {type: GraphQLString},
        createdAt: {type: DateType}
    })
});
export const messageInputType = new GraphQLInputObjectType({
    name: "MessageInput",
    fields: {
        user: {type: GraphQLID},
        conversation: {type: GraphQLID},
        msgContent: {type: GraphQLString},
        msgType: {type: GraphQLString},
        createdAt: {type: DateType}
    }
});