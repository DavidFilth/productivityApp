import activityMutations from "./activity";
import articleMutations from "./article";
import companyMutations from "./company";
import conversationMutations from "./conversation";
import designationMutations from "./designation";
import empTypeMutations from "./empType";
import groupMutations from "./group";
import jobTitleMutations from "./jobTitle";
import masterGroupMutations from "./masterGroup";
import messageMutations from "./message";
import notificationMutations from "./notification";
import projectMutations from "./project";
import roleMutations from "./role";
import seniorityLvlMutations from "./seniorityLvl";
import skillMutations from "./skill";
import teamMutations from "./team";
import userMutations from "./userMutation";
import vacancyMutations from "./vacancy";

export default {
    ...activityMutations,
    ...articleMutations,
    ...companyMutations,
    ...conversationMutations,
    ...designationMutations,
    ...empTypeMutations,
    ...groupMutations,
    ...jobTitleMutations,
    ...masterGroupMutations,
    ...messageMutations,
    ...notificationMutations,
    ...projectMutations,
    ...roleMutations,
    ...seniorityLvlMutations,
    ...skillMutations,
    ...teamMutations,
    ...userMutations,
    ...vacancyMutations
};