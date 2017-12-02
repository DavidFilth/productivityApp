import * as ErrorMessages from './errorMessages';

export type Rule = (type: string, form?: Object) => ErrorMessages.ErrorDisplayer | null;

export const required: Rule = (text: string) => {
    return text ? null : ErrorMessages.isRequired;
};
export const mustMatch = (field: string, fieldName: string): Rule => {
    return (text: string, form: Object) => {
        return form[field] === text ? null : ErrorMessages.mustMatch(fieldName);
    };
};
export const minLength = (length: number): Rule => {
    return (text: string) => {
        return text.length >= length ? null : ErrorMessages.minLength(length);
    };
};
export const maxLength = (length: number): Rule => {
    return (text: string) => {
        return text.length <= length ? null : ErrorMessages.maxLength(length);
    };
};
export const email: Rule = (text: string) => {
    return text.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        ? null : ErrorMessages.email;
};