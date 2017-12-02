export type ErrorDisplayer = (field: string) => string;

export const isRequired: ErrorDisplayer = 
(fieldName: string) => `${fieldName} is required`;
export const mustMatch = 
(otherFieldName: string): ErrorDisplayer => {
    return (fieldName: string) => `${fieldName} must match ${otherFieldName}`;
};
export const minLength = (length: number): ErrorDisplayer => {
    return (fieldName: string) => `${fieldName} must be at least ${length}`;
};
export const maxLength = (length: number): ErrorDisplayer => {
    return (fieldName: string) => `${fieldName} must be at most ${length}`;
};
export const email: ErrorDisplayer = (fieldName: string) => {
    return `${fieldName} is not a valid email`;
};