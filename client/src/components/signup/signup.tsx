import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ruleRunnner, run, Rules } from '../../util/validation/index';
import { client } from '../../util/graphql/client';
import { ApolloQueryResult } from 'apollo-client';
import * as update from 'immutability-helper';
import InputField from '../util/inputField';
import * as React from 'react';
import gql from 'graphql-tag';

export interface SignUpProps extends RouteComponentProps<{}> {
    onUserSignUp(): void;
}
export interface SignUpState {
    form: {
        firstName: string;
        lastName: string;
        location: string;
        email: string;
        password: string,
        confirmPass: string
    };
    isValid: boolean;
    validationErrors: CustomInterfaces.GenericForm | null;
}
const fieldValidations = [
    ruleRunnner('firstName', 'First Name', Rules.required),
    ruleRunnner('lastName', 'Last Name', Rules.required),
    ruleRunnner('location', 'Location', Rules.required),
    ruleRunnner('password', 'Password', Rules.required, Rules.minLength(4)),
    ruleRunnner('confirmPass', 'Confirm Password', Rules.mustMatch('password', 'Password'))
];

class SignUp extends React.Component<SignUpProps, SignUpState> {
    constructor(props: SignUpProps) {
        super(props);
        this.state = {
            form: {
                firstName: '',
                lastName: '',
                location: '',
                email: '',
                password: '',
                confirmPass: ''
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
        const validators = run(form, fieldValidations);
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
        client.mutate({mutation: gql`
            mutation{
                addUser(
                    data: {
                        email: "${this.state.form.email}",
                        password: "${this.state.form.email}",
                        profile: {
                            firstName: "${this.state.form.firstName}",
                            lastName: "${this.state.form.lastName}",
                            location: "${this.state.form.location}",
                        }
                    }
                ){
                    _id,
                    email,
                    profile{
                        firstName,
                        lastName
                    }
                }
            }
        `}).then((res: ApolloQueryResult<{
            addUser: CustomInterfaces.UserInterface;
        }>) => {
            console.log('Added new user: ' + res.data.addUser);
            this.props.history.push('/login');
        });
        return false;
    }
    render() {
        let { firstName, lastName, location, email, password, confirmPass } = this.state.form;
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
                            <h2>Register New User</h2>
                            <hr/>
                        </div>
                    </div>
                    <InputField 
                        name="firstName"
                        id="firstname"
                        placeholder="Jhonny"
                        label="First Name"
                        onChange={this.handleFieldChanged('firstName')}
                        value={firstName}
                        type="text"
                        addon="fa-address-card"
                        errortext={this.fieldHasError('firstName')}
                    />
                    <InputField 
                        name="lastName"
                        id="lastname"
                        placeholder="Smith"
                        label="Last Name"
                        onChange={this.handleFieldChanged('lastName')}
                        value={lastName}
                        type="text"
                        addon="fa-address-card-o"
                        errortext={this.fieldHasError('lastName')}
                    />
                    <InputField 
                        name="location"
                        id="location"
                        placeholder="Anaheim, CA"
                        label="Location"
                        onChange={this.handleFieldChanged('location')}
                        value={location}
                        type="text"
                        addon="fa-map-marker"
                        errortext={this.fieldHasError('location')}
                    />
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
                    <InputField 
                        name="confirmPass"
                        id="confirmPass"
                        placeholder="1234"
                        label="Confirm Password"
                        onChange={this.handleFieldChanged('confirmPass')}
                        value={confirmPass}
                        type="password"
                        addon="fa-repeat"
                        errortext={this.fieldHasError('confirmPass')}
                    />
                    
                    <div className="row">
                        <div className="col-md-3"/>
                        <div className="col-md-6">
                            
                            <button 
                                type="submit"
                                className="btn btn-success btn-lg btn-block"
                            >
                                <i className="fa fa-user-plus"/> Register
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(SignUp);