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

export const notificationType = new GraphQLObjectType({
    name: "Notification",
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLID)},
        content: {type: GraphQLString},
        sender: {type: GraphQLString},
        notifType: {type: GraphQLString},
        users: {
            type: new GraphQLList(userType),
            resolve: (notification) => {
                return userModel.find({_id: {$in: notification.users}}).exec();
            }
        },
        company: {
            type: companyType,
            resolve: (notification) => {
                return companyModel.findById(notification.company).exec();
            }
        }
    })
});

export const notificationInputType = new GraphQLInputObjectType({
    name: "NotificationInput",
    fields: {
        company: {type: GraphQLID},
        content: {type: GraphQLString},
        sender: {type: GraphQLString},
        users: {type: new GraphQLList(GraphQLID)},
        notifType: {type: GraphQLString}
    }
});