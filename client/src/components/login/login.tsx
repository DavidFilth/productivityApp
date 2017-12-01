import { withRouter, RouteComponentProps } from 'react-router-dom';
import { client } from '../../util/graphql/client';
import * as update from 'immutability-helper';
import { ApolloQueryResult } from 'apollo-client';
import * as React from 'react';
import gql from 'graphql-tag';
import './style.css';

export interface LoginProps {
    onLogUserIn(user: CustomInterfaces.UserInterface): void;
}

class Login extends React.Component<
    RouteComponentProps<{}> & LoginProps , 
    {form: {email: string, password: string}}> {
    constructor(props: RouteComponentProps<{}> & LoginProps) {
        super(props);
        this.state = {
            form: {
                email: '',
                password: ''
            }
        };
        this.handleFieldChanged = this.handleFieldChanged.bind(this);
        this.handleSubmitClicked = this.handleSubmitClicked.bind(this);
    }
    handleFieldChanged(field: string) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            let newState = update(this.state, {
                form: {
                    [field]: {$set: e.target.value}
                }
            });
            this.setState(newState);
        };
    }
    handleSubmitClicked(e: React.UIEvent<HTMLFormElement>) {
        e.preventDefault();
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
        return (
            <div className="container">
                <form className="form-horizontal" onSubmit={this.handleSubmitClicked}>
                    <div className="row">
                        <div className="col-md-3"/>
                        <div className="col-md-6">
                            <h2>Please Login</h2>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 field-label-responsive">
                            <label htmlFor="email"> Email: </label>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <div className="input-group-addon">
                                        <i className="fa fa-at"/>
                                    </div>
                                    <input 
                                        className="form-control" 
                                        placeholder="a@b.com" 
                                        type="email" 
                                        name="email" 
                                        id="email"
                                        onChange={this.handleFieldChanged('email')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            error messages
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 field-label-responsive">
                            <label htmlFor="password"> Password: </label>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <div className="input-group-addon">
                                        <i className="fa fa-key"/>
                                    </div>
                                    <input 
                                        className="form-control" 
                                        placeholder="1234" 
                                        type="password" 
                                        id="password" 
                                        onChange={this.handleFieldChanged('password')} 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            error messages
                        </div>
                    </div>
                    <div className="row" style={{paddingTop: '1rem'}}>
                        <div className="col-md-3"/>
                        <div className="col-md-6">
                            <button 
                                type="submit" 
                                className="btn btn-primary btn-lg btn-block"
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