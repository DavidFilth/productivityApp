import * as ErrorMessages from './errorMessages';

export const required: CustomInterfaces.Rule = (text: string) => {
    return text ? null : ErrorMessages.isRequired;
};
export const mustMatch = (field: string, fieldName: string): CustomInterfaces.Rule => {
    return (text: string, form: Object) => {
        return form[field] === text ? null : ErrorMessages.mustMatch(fieldName);
    };
};
export const minLength = (length: number): CustomInterfaces.Rule => {
    return (text: string) => {
        return text.length >= length ? null : ErrorMessages.minLength(length);
    };
};
export const maxLength = (length: number): CustomInterfaces.Rule => {
    return (text: string) => {
        return text.length <= length ? null : ErrorMessages.maxLength(length);
    };
};
export const email: CustomInterfaces.Rule = (text: string) => {
    return text.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        ? null : ErrorMessages.email;
};