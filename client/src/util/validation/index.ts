import * as Rules from './rules';

export const ruleRunnner: CustomInterfaces.RuleRunner = (field, name, ...rules) => {
    return (form: CustomInterfaces.GenericForm) => {
        for (let rule of rules) {
            let errorMessageFunc = rule(form[field], form);
            if (errorMessageFunc) {
                return {[field]: errorMessageFunc(name)};
            }
        }
        return null;
    };
};
export const run = (form: CustomInterfaces.GenericForm, runners: Array<CustomInterfaces.Runner>): 
    CustomInterfaces.GenericForm | null => {
    const res = runners.reduce(
        (memo, runner) => {
            return Object.assign(memo, runner(form));
        },
        {}
    );
    return Object.keys(res).length > 0 ? res : null;
};

export {Rules};