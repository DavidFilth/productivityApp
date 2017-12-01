export const isRequired: CustomInterfaces.ErrorDisplayer = 
(fieldName: string) => `${fieldName} is required`;
export const mustMatch = 
(otherFieldName: string): CustomInterfaces.ErrorDisplayer => {
    return (fieldName: string) => `${fieldName} must match ${otherFieldName}`;
};
export const minLength = (length: number): CustomInterfaces.ErrorDisplayer => {
    return (fieldName: string) => `${fieldName} must be at least ${length}`;
};
export const maxLength = (length: number): CustomInterfaces.ErrorDisplayer => {
    return (fieldName: string) => `${fieldName} must be at most ${length}`;
};
export const email: CustomInterfaces.ErrorDisplayer = (fieldName: string) => {
    return `${fieldName} is not a valid email`;
};