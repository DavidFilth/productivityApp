declare namespace CustomInterfaces {
    export interface CompanyInterface extends Document {
        name: string;
        alias: string;
    }
    export interface UserInterface {
        email: string;
        roleId: string;
    }
}