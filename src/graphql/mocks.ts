import * as casual from "casual";

export default {
    profile: () => ({
        firstName: casual._first_name(),
        lastName: casual._last_name(),
        gender: casual._coin_flip() ? "male" : "female",
        location: casual._city(),
        portfolio: casual._url(),
        picture: casual._url()
    }),
    company: () => ({
        name: casual._company_name(),
        alias: casual._company_suffix()
    }),
    activity: () => ({
        content: casual._text(),
        progress: casual.integer(0, 100),
    }),
    article: () => ({
        author: casual._name(),
        title: casual._title(),
        content: casual._text()
    }),
    conversation: () => ({
        conversationType: casual._coin_flip() ? "ptop" : "group",
        conversationName: casual._word()
    }),
    date: () => new Date(),
    designation: () => ({
        name: casual._title()
    }),
    empType: () => ({
        name: casual._title()
    }),
    group: () => ({
        name: casual.words(3)
    }),
    jobTitle: () => ({
        name: casual._title()
    }),
    masterGroup: () => ({
        name: casual._company_suffix()
    }),
    message: () => ({
        msgContent: casual._sentence(),
        msgType: casual._word()
    }),
    notification: () => ({
        content: casual._description(),
        sender: casual._name(),
        notifType: casual._word()
    }),
    project: () => ({
        name: casual._catch_phrase(),
        status: casual._coin_flip() ? "completed" : "in progress"
    }),
    role: () => ({
        name: casual._title(),
        alias: casual._word(),
        permissions: casual.array_of_words()
    }),
    seniorityLvl: () => ({
        name: casual._title()
    }),
    skill: () => ({
        name: casual.words(2)
    }),
    team: () => ({
        name: casual.words(3),
        location: casual._city(),
    }),
    meetings: () => ({
        location: casual._city()
    }),
    User: () => ({
        email: casual._email(),
        password: casual._password(),
        passwordResetToken: casual._password(),
        fte: casual._word()
    })
};