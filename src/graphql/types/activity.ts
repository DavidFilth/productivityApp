import { DateType as GraphQLDate } from "./date";
import projectModel from "../../models/Project";
import CompanyModel from "../../models/Company";
import UserModel from "../../models/User";
import { companyType } from "./company";
import { projectType } from "./project";
import { userType } from "./user";
import {
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
} from "graphql";

export const activityType = new GraphQLObjectType({
    name: "Activity",
    description: "The Activity Object type represents an activity related to a company and an specific project",
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLID) },
        company: { 
            type: new GraphQLNonNull(companyType),
            resolve: (activity) => {
                return CompanyModel.findById(activity.company).exec();
            }
        },
        project: { 
            type: new GraphQLNonNull(projectType),
            resolve: (activity) => {
                return projectModel.findById(activity.project).exec();
            }
        },
        content: { type: new GraphQLNonNull(GraphQLString) },
        progress: { type: new GraphQLNonNull(GraphQLInt) },
        users: { 
            type: new GraphQLList(userType),
            resolve: (activity) => {
                return UserModel.find({_id: {$in: activity.users}}).exec();
            }
        },
        dueAt: { type: GraphQLDate },
    })
});
export const activityInputType = new GraphQLInputObjectType({
    name: "ActivityInput",
    description: "The ActivityInput is an InputObject type used to create or update an Activity object",
    fields: () => ({
        company: {type: GraphQLID },
        project: {type: GraphQLID},
        content: {type: GraphQLString},
        progress: { type: GraphQLInt },
        users: { type: new GraphQLList(GraphQLID) },
        dueAt: { type: GraphQLString }
    })
});