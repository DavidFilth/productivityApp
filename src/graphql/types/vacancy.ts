import seniorityLvlModel from "../../models/SeniorityLvl";
import jobTitleModel from "../../models/JobTitle";
import companyModel from "../../models/Company";
import empTypeModel from "../../models/EmpType";
import userModel from "../../models/User";
import { seniorityLvlType } from "./seniorityLvl";
import { jobTitleType } from "./jobTitle";
import { empType } from "./empType";
import { companyType } from "./company";
import { userType } from "./user";
import {
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean
} from "graphql";

export const vacancyType = new GraphQLObjectType({
    name: "vacancy",
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: GraphQLString},
        location: {type: GraphQLString},
        telecommuting: {type: GraphQLBoolean},
        categories: {type: new GraphQLList(GraphQLString)},
        description: {type: GraphQLString},
        responsibilities: {type: GraphQLString},
        qualifications: {type: GraphQLString},
        optQualifications: {type: GraphQLString},
        otherDetails: {type: GraphQLString},
        company: {
            type: companyType,
            resolve: (vacancy) => {
                return companyModel.findById(vacancy.company).exec();
            }
        },
        jobTitle: {
            type: jobTitleType,
            resolve(vacancy) {
                return jobTitleModel.findById(vacancy.jobTitle).exec();
            }
        },
        empType: {
            type: empType,
            resolve(vacancy) {
                return empTypeModel.findById(vacancy.empType).exec();
            }
        },
        applicants: {
            type: new GraphQLList(userType),
            resolve: (vacancy) => {
                return userModel.find({_id: {$in: vacancy.applicants}}).exec();
            }
        },
        seniorLvl: {
            type: seniorityLvlType,
            resolve(vacancy) {
                return seniorityLvlModel.findById(vacancy.seniorLvl).exec();
            }
        }
    })
});

export const vacancyInputType = new GraphQLInputObjectType({
    name: "vacancyInput",
    fields: {
        company: {type: GraphQLID},
        name: {type: GraphQLString},
        location: {type: GraphQLString},
        jobTitle: {type: GraphQLID},
        telecommuting: {type: GraphQLBoolean},
        empType: {type: GraphQLID},
        seniorLvl: {type: GraphQLID},
        categories: {type: new GraphQLList(GraphQLString)},
        description: {type: GraphQLString},
        responsibilities: {type: GraphQLString},
        qualifications: {type: GraphQLString},
        optQualifications: {type: GraphQLString},
        otherDetails: {type: GraphQLString},
        applicants: {type: new GraphQLList(GraphQLID)}
    }
});