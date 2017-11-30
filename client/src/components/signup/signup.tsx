import { client } from '../../util/graphql/client';
import * as update from 'immutability-helper';
import * as React from 'react';
import gql from 'graphql-tag';
import { withRouter, RouteComponentProps } from 'react-router-dom'
import './style.css';

class SignUp extends React.Component<
    RouteComponentProps<{}>, 
    {
        form: {
            firstName: string;
            lastName: string;
            location: string;
            email: string;
            password: string,
            confirmPass: string
        }
    }> {
    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = {
            form: {
                firstName: '',
                lastName: '',
                location: '',
                email: '',
                password: '',
                confirmPass: ''
            }
        };
        this.handleFieldChanged = this.handleFieldChanged.bind(this);
        this.handleSubmitClicked = this.handleSubmitClicked.bind(this);
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
        `}).then((res) => {
            if(res.data){
                console.log('Added new user: ' + res.data['addUser'] );
                this.props.history.push('/login');
            } 
        });
        return false;
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
    render() {
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
                    <div className="row">
                        <div className="col-md-3 field-label-responsive">
                            <label htmlFor="firstname"> First Name: </label>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <div className="input-group-addon">
                                        <i className="fa fa-address-card"/>
                                    </div>
                                    <input 
                                        className="form-control" 
                                        placeholder="Jhonny" 
                                        type="text" 
                                        id="firstname"
                                        onChange={this.handleFieldChanged('firstName')}
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
                            <label htmlFor="lastname"> Last Name: </label>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <div className="input-group-addon">
                                        <i className="fa fa-address-card-o"/>
                                    </div>
                                    <input 
                                        className="form-control" 
                                        placeholder="Smith" 
                                        type="text" 
                                        id="lastname"
                                        onChange={this.handleFieldChanged('lastName')}
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
                            <label htmlFor="location"> Location: </label>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <div className="input-group-addon">
                                        <i className="fa fa-map-marker"/>
                                    </div>
                                    <input 
                                        className="form-control" 
                                        placeholder="Anaheim,CA" 
                                        type="text" 
                                        id="location"
                                        onChange={this.handleFieldChanged('location')}
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
                                        placeholder="1234" 
                                        type="email" 
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
                    <div className="row">
                        <div className="col-md-3 field-label-responsive">
                            <label htmlFor="confirmPass"> Confirm Pass: </label>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <div className="input-group-addon">
                                        <i className="fa fa-repeat"/>
                                    </div>
                                    <input 
                                        className="form-control" 
                                        placeholder="1234" 
                                        type="password" 
                                        id="confirmPass"
                                        onChange={this.handleFieldChanged('confirmPass')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            error messages
                        </div>
                    </div>
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