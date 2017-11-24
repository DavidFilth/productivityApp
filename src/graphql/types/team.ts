import companyModel from "../../models/Company";
import projectModel from "../../models/Project";
import userModel from "../../models/User";
import { companyType } from "./company";
import { projectType } from "./project";
import { DateType } from "./date";
import { userType } from "./user";
import {
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLInt
} from "graphql";

export const meetingType = new GraphQLObjectType({
    name: "meeting",
    fields: {
        date: {type: DateType},
        time: {type: DateType},
        location: {type: GraphQLString}
    }
});

export const teamType = new GraphQLObjectType({
    name: "team",
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: GraphQLString},
        location: {type: GraphQLString},
        meetings: {type: meetingType},
        company: {
            type: companyType,
            resolve: (team) => {
                return companyModel.findById(team.company).exec();
            }
        },
        members: {
            type: new GraphQLList(userType),
            resolve: (team) => {
                return userModel.find({_id: {$in: team.members}}).exec();
            }
        }
    })
});

export const meetingInputType = new GraphQLInputObjectType({
    name: "meetingInput",
    fields: {
        date: {type: DateType},
        time: {type: DateType},
        location: {type: GraphQLString}
    }  
});

export const teamInputType = new GraphQLInputObjectType({
    name: "teamInput",
    fields: {
        company: {type: GraphQLID},
        name: {type: GraphQLString},
        project: {type: GraphQLID},
        location: {type: GraphQLString},
        meetings: {type: meetingInputType},
        members: {type: new GraphQLList(GraphQLID)}
    }
});