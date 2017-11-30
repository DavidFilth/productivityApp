import * as casual from "casual";
import { MockList } from "graphql-tools";

export default {
    Profile: () => ({
        firstName: casual._first_name(),
        lastName: casual._last_name(),
        gender: casual._coin_flip() ? "male" : "female",
        location: casual._city(),
        portfolio: casual._url(),
        picture: casual._url()
    }),
    Company: () => ({
        name: casual._company_name(),
        alias: casual._company_suffix()
    }),
    Activity: () => ({
        content: casual._text(),
        progress: casual.integer(0, 100),
        users: () => new MockList([2, 3])
    }),
    Article: () => ({
        author: casual._name(),
        title: casual._title(),
        content: casual._text()
    }),
    Conversation: () => ({
        conversationType: casual._coin_flip() ? "ptop" : "group",
        conversationName: casual._word(),
        participants: () => new MockList([1, 5])
    }),
    Date: () => new Date(),
    Designation: () => ({
        name: casual._title()
    }),
    EmpType: () => ({
        name: casual._title()
    }),
    Group: () => ({
        name: casual.words(3),
        members: () => new MockList([2, 6])
    }),
    JobTitle: () => ({
        name: casual._title()
    }),
    MasterGroup: () => ({
        name: casual._company_suffix(),
        members: () =>  new MockList([4, 6])
    }),
    Message: () => ({
        msgContent: casual._sentence(),
        msgType: casual._word()
    }),
    Notification: () => ({
        content: casual._description(),
        sender: casual._name(),
        notifType: casual._word(),
        users: () => new MockList([1, 3])
    }),
    Project: () => ({
        name: casual._catch_phrase(),
        status: casual._coin_flip() ? "completed" : "in progress",
        skillRequired: () => new MockList([5, 10]),
        assets: () => new MockList([6, 10]),
        teams: () => new MockList([1, 3])
    }),
    Role: () => ({
        name: casual._title(),
        alias: casual._word(),
        permissions: casual.array_of_words()
    }),
    SeniorityLvl: () => ({
        name: casual._title()
    }),
    Skill: () => ({
        name: casual.words(2)
    }),
    Team: () => ({
        name: casual.words(3),
        location: casual._city(),
        members: () => new MockList([4, 5])
    }),
    Meetings: () => ({
        location: casual._city()
    }),
    User: () => ({
        email: casual._email(),
        password: casual._password(),
        passwordResetToken: casual._password(),
        fte: casual._word(),
        conversation: () => new MockList([7, 10]),
        projects: () => new MockList([1, 3]),
        notifications: () => new MockList([3, 6]),
        skills: () => new MockList([5, 10]),
        contacts: () => new MockList([5, 6]),
        teams: () => new MockList([1, 2])
    }),
    Vacancy: () => ({
        name: casual._title(),
        location: casual._city(),
        telecommuting: casual._coin_flip(),
        categories: casual.array_of_words(5),
        description: casual._description(),
        responsabilities: casual._description(),
        qualifications: casual._description(),
        optQualifications: casual._description(),
        otherDetails: casual._short_description(),
        applicants: () => new MockList([1, 9]) 
    })
};