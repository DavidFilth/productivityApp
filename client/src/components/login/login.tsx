import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ruleRunnner, Rules, run  } from '../../util/validation';
import { client } from '../../util/graphql/client';
import { ApolloQueryResult } from 'apollo-client';
import * as update from 'immutability-helper';
import InputField from '../util/inputField';
import * as React from 'react';
import gql from 'graphql-tag';

export interface LoginProps extends RouteComponentProps<{}> {
    onLogUserIn(user: CustomInterfaces.UserInterface): void;
}
export interface LoginState {
    form: {
        email: string,
        password: string
    };
    isValid: boolean;
    validationErrors: CustomInterfaces.GenericForm | null;
}

const fieldValidation = [
    ruleRunnner('email', 'Email', Rules.required, Rules.email),
    ruleRunnner('password', 'Password', Rules.minLength(4), Rules.required)
];

class Login extends React.Component< LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = {
            form: {
                email: '',
                password: ''
            },
            isValid: true,
            validationErrors: null
        };
        this.handleFieldChanged = this.handleFieldChanged.bind(this);
        this.handleSubmitClicked = this.handleSubmitClicked.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }
    componentWillMount() {
        this.validateForm();
    }
    validateForm(form: CustomInterfaces.GenericForm = this.state.form) {
        let validators = run(form, fieldValidation);
        this.setState({
            validationErrors: validators,
            isValid: validators === null
        });
    }
    handleFieldChanged(field: string) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            let newState = update(this.state, {
                form: {
                    [field]: {$set: e.target.value}
                }
            });
            this.setState(newState);
            this.validateForm(newState.form);
        };
    }
    fieldHasError(field: string) {
        if (this.state.validationErrors) {
            return this.state.validationErrors[field];
        }
        return;
    }
    handleSubmitClicked(e: React.UIEvent<HTMLFormElement>) {
        e.preventDefault();
        this.validateForm();
        if (!this.state.isValid) {
            return false;
        }
        client.mutate({ mutation: gql`
            mutation{
                login(
                    email:"${this.state.form.email}",
                    password:"${this.state.form.password}"
                ){
                    _id,
                    email,
                    company{
                        _id,
                        name
                    },
                    notifications{
                        content,
                        sender
                    },
                    teams{
                        members{_id}
                    },
                    profile{
                        firstName,
                        lastName
                    }
                }
            }
        `
        }).then((res: ApolloQueryResult<{
            login: CustomInterfaces.UserInterface;
        }>) => {
            if (res.data) {
                this.props.onLogUserIn(res.data.login);
                this.props.history.push('/network');
            }
        });
        return false;
    }
    render() {
        let { email, password } = this.state.form;
        return (
            <div className="container">
                <form 
                    className="form-horizontal" 
                    onSubmit={this.handleSubmitClicked}
                    noValidate={true}
                >
                    <div className="row">
                        <div className="col-md-3"/>
                        <div className="col-md-6">
                            <h2>Please Login</h2>
                            <hr/>
                        </div>
                    </div>
                    <InputField 
                        name="email"
                        id="email"
                        placeholder="a@b.com"
                        label="Email"
                        onChange={this.handleFieldChanged('email')}
                        value={email}
                        type="email"
                        addon="fa-at"
                        errortext={this.fieldHasError('email')}
                    />
                    <InputField
                        name="password"
                        id="password"
                        placeholder="1234"
                        label="Password"
                        onChange={this.handleFieldChanged('password')}
                        value={password}
                        type="password"
                        addon="fa-key"
                        errortext={this.fieldHasError('password')}
                    />
                    <div className="row" style={{paddingTop: '1rem'}}>
                        <div className="col-md-3"/>
                        <div className="col-md-6">
                            <button 
                                type="submit" 
                                className="btn btn-primary btn-lg btn-block"
                                disabled={!this.state.isValid}
                            >
                                <i className="fa fa-sign-in"/> Login
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
export default withRouter(Login);