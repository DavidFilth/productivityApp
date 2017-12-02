
declare namespace CustomInterfaces {
    export interface CompanyInterface extends Document {
        _id: string;
        name: string;
        alias: string;
        mastergroup: MasterGroupInterface;
    }
    export interface Profile {
        firstName: string;
        lastName: string;
        gender: string;
        birthday: Date;
        location: string;
        portfolio: string;
        picture: string;
    }
    export interface UserInterface {
        _id: string;
        email: string;
        password: string;
        passwordResetToken: string;
        passwordResetExpires: Date;
        company: CompanyInterface;
        role: RoleInterface;
        doj: Date;
        fte: string;
        skills: Array<SkillInterface>;
        conversations: Array<ConversationInterface>;
        teams: Array<TeamInterface>;
        groups: Array<GroupInterface>;
        contacts: Array<UserInterface>;
        profile: Profile;
        notifications: Array<NotificationInterface>;
        comparePassword: (candidatePassword: string) => boolean;
        gravatar: (size: number) => string;
      }
    export interface ActivityInterface {
        company: CompanyInterface;
        content: string;
        progress: number;
        users: Array<UserInterface>;
        dueAt: Date;
    }
    export interface ArticleInterface {
        company: CompanyInterface;
        author: String;
        title: string;
        content: string;
    }
    export interface ConversationInterface {
        company: CompanyInterface;
        owner: UserInterface;
        conversationType: string;
        conversationName: string;
        participants: Array<UserInterface>;
    }
    export interface DesignationInterface {
        company: CompanyInterface;
        name: string;
    }
    export interface EmpTypeInterface {
        company: CompanyInterface;
        name: string;
    }
    export interface GroupInterface {
        company: CompanyInterface;
        name: string;
        members: Array<UserInterface>;
    }
    export interface JobTitleInterface {
        company: CompanyInterface;
        name: string;
    }
    export interface MasterGroupInterface {
        company: CompanyInterface;
        name: string;
        members: Array<UserInterface>;
    }
    export interface MessageInterface {
        user: UserInterface
        conversation: ConversationInterface;
        msgContent: string;
        msgType: string;
        createdAt: Date;
    }
    export interface NotificationInterface {
        company: CompanyInterface;
        content: string;
        sender: string;
        users: Array<UserInterface>;
        notifType: string;
    }
    export interface ProjectModel {
        company: CompanyInterface;
        name: string;
        skillsRequired: Array<SkillInterface>;
        team: TeamInterface;
        assets: Array<UserInterface>;
        status: string;
        startDate: Date;
        finishDate: Date;
    }
    export interface RoleInterface {
        name: string;
        alias: string;
        permissions: string;
        company: CompanyInterface;
    }
    export interface SeniorityLvlInterface {
        company: CompanyInterface;
        name: string;
    }
    export interface SkillInterface {
        company: CompanyInterface
        name: string;
    }
    export interface TeamInterface {
        company: CompanyInterface
        name: string;
        location: string;
        meetings: {
            date: Date;
            time: Date;
            location: string;
        };
        members: Array<UserInterface>;
    }
    export interface VacanyInterface {
        company: CompanyInterface
        name: string;
        location: string;
        jobTitle: JobTitleInterface;
        telecommuting: boolean;
        empType: EmpTypeInterface;
        seniorLvl: SeniorityLvlInterface;
        categories: Array<string>;
        description: string;
        responsibilities: string;
        qualifications: string;
        optQualifications: string;
        otherDetails: string;
        applicants: Array<UserInterface>;
    }
    export interface GenericForm {
        [key: string]: string;
    }
}