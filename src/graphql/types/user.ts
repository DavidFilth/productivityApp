import { skillType, skillInputType } from "./skill";
import notificationModel from "../../models/Notification";
import { notificationType } from "./notification";
import { profile, profileInput } from "./profile";
import { DateType as GraphQLDate } from "./date";
import projectModel from "../../models/Project";
import companyModel from "../../models/Company";
import groupModel from "../../models/Group";
import skillModel from "../../models/Skill";
import teamModel from "../../models/Team";
import userModel from "../../models/User";
import roleModel from "../../models/Role";
import { companyType } from "./company";
import { projectType } from "./project";
import { groupType } from "./group";
import { teamType } from "./team";
import { roleType } from "./role";
import {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList
} from "graphql";

export const userType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLID)},
        email: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: new GraphQLNonNull(GraphQLString)},
        profile: {type: profile}, 
        passwordResetToken: { type: GraphQLString },
        passwordResetExpires: { type: GraphQLDate },
        doj: { type: GraphQLDate },
        fte: { type: GraphQLString },
        company: {
            type: companyType,
            resolve(user) {
                return companyModel.findById(user.company).exec();
            }
        },
        conversations: { 
            type: new GraphQLList(companyType),
            resolve: (user) => {
                return userModel.find({_id: {$in: user.conversations}}).exec();
            }
        },
        projects: {
            type: new GraphQLList(projectType),
            resolve: (user) => {
                return projectModel.find({assets: user._id}).exec();
            }
        },
        notifications: {
            type: new GraphQLList(notificationType),
            resolve(user) {
                return notificationModel.find({users: user._id});
            }
        },
        skills: { 
            type: new GraphQLList(skillType),
            resolve(user) {
                return skillModel.find({_id: {$in: user.skills}}).exec();
            }
        },
        teams: {
            type: new GraphQLList(teamType),
            resolve(user)  {
                return teamModel.find({members: user._id});
            }
        },
        groups: {
            type: new GraphQLList(groupType),
            resolve: (user) => {
                return groupModel.find({_id: {$in: user.groups}}).exec();
            }
        },
        contacts: { 
            type: new GraphQLList(userType),
            resolve(user) {
                return userModel.find({_id: {$in: user.contacts}}).exec();
            }
        },
        role: { 
            type: roleType ,
            resolve(user) {
                return roleModel.findById(user.role).exec();
            }
        },
    })
});

export const userInputType = new GraphQLInputObjectType({
    name: "UserInput",
    fields: () => ({
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        company: {type: GraphQLID},
        profile: {type: profileInput},
        passwordResetToken: { type: GraphQLString },
        passwordResetExpires: { type: GraphQLDate },
        role: { type: GraphQLID },
        doj: { type: GraphQLDate },
        fte: { type: GraphQLString },
        conversations: { type: new GraphQLList(GraphQLID) },
        skills: { type: new GraphQLList(GraphQLID) },
        teams: { type: new GraphQLList(GraphQLID) },
        groups: { type: new GraphQLList(GraphQLID) },
        contacts: { type: new GraphQLList(GraphQLID) }
    })
});


