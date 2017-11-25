import { skillType, skillInputType } from "./skill";
import companyModel from "../../models/Company";
import skillModel from "../../models/Skill";
import teamModel from "../../models/Team";
import userModel from "../../models/User";
import { companyType } from "./company";
import { teamType } from "./team";
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



export const projectType = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLID)},
        company: {
            type: companyType,
            resolve: (project) => {
                return companyModel.findById(project.company).exec();
            }
        },
        name: {type: GraphQLString},
        skillsRequired: {
            type: new GraphQLList(skillType),
            resolve(project) {
                return skillModel.find({_id: {$in: project.skillsRequired}}).exec();
            }
        },
        assets: {
            type: new GraphQLList(userType),
            resolve(project) {
                return userModel.find({_id: {$in: project.assets}});
            }
        },
        teams: {
            type: new GraphQLList(teamType),
            resolve: (project) => {
                return teamModel.findById(project.team).exec();
            }
        },
        status: {type: GraphQLString},
        startDate: {type: DateType},
        finishDate: {type: DateType}
    })
});

export const projectInputType = new GraphQLInputObjectType({
    name: "ProjectInput",
    fields: {
        company: {type: GraphQLID},
        name: {type: GraphQLString},
        skillsRequired: {type: new GraphQLList(GraphQLID)},
        teams: {type: new GraphQLList(GraphQLID)},
        status: {type: GraphQLString},
        startDate: {type: DateType},
        finishDate: {type: DateType},
        assets: {type: new GraphQLList(GraphQLID)}
    }
});