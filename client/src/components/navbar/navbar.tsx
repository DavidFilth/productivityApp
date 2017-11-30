import Dashboard from '../dashboard/dashboard';
import OptionallyDisplayed from '../util/optionallyDisplayed';
import Footer from '../footer/footer';
import Signup from '../signup/signup';
import Login from '../login/login';
import Home from '../home/home';
import * as React from 'react';
import './style.css';
import {
  NavLink,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

export interface NavBarState {
  auth: boolean;
}

export default class Navbar extends React.Component<{}, NavBarState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      auth: false
    };
  }
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
            <a className="navbar-brand" href="#"> Productivity App </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/" exact={true}>
                    <span className="menu-icon fa fa-home" />
                    Home
                  </NavLink>
                </li>
                <OptionallyDisplayed display={this.state.auth}>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/network">
                      <span className="menu-icon fa fa-share-alt-square" />
                      Network
                    </NavLink>
                  </li>
                </OptionallyDisplayed>
                <OptionallyDisplayed display={this.state.auth}>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/project">
                      <span className="menu-icon fa fa-suitcase" />
                      Projects
                    </NavLink>
                    
                  </li>
                </OptionallyDisplayed>
                <OptionallyDisplayed display={this.state.auth}>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/team">
                      <span className="menu-icon fa fa-users" />
                      Teams
                    </NavLink>
                  </li>
                </OptionallyDisplayed>
                <OptionallyDisplayed display={this.state.auth}>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/employee">
                      <span className="menu-icon fa fa-user" />
                      Employee
                    </NavLink>
                  </li>
                </OptionallyDisplayed>
                <OptionallyDisplayed display={this.state.auth}>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/messenger">
                      <span className="menu-icon fa fa-comments" />
                      Messenger
                    </NavLink>
                  </li>
                </OptionallyDisplayed>
                <OptionallyDisplayed display={!this.state.auth}>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      <span className="menu-icon fa fa-pencil-square-o" />
                      Register
                    </NavLink>
                  </li>
                </OptionallyDisplayed>
                <OptionallyDisplayed display={!this.state.auth}>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      <span className="menu-icon fa fa-sign-in" />
                      Log in
                    </NavLink>
                  </li>
                </OptionallyDisplayed>
                <OptionallyDisplayed display={this.state.auth} >
                <li className="nav-item">
                  <NavLink className="nav-link" to="/logout">
                    <span className="menu-icon fa fa-sign-out" />
                    Log out
                  </NavLink>
                </li>
                </OptionallyDisplayed>
              </ul>
              <OptionallyDisplayed display={!this.state.auth}>
                <form>
                  <div className="form-row">
                    <div className="form-groupcol-md-5" >
                      <label htmlFor="inputEmail1">
                        Email
                    </label>
                      <input
                        className="form-control form-control-sm"
                        type="email"
                        id="inputEmail1"
                        placeholder="Email"
                      />
                    </div>
                    <div className="form-groupcol-md-5" >
                      <label htmlFor="inputPassword1">
                        Password
                    </label>
                      <input
                        className="form-control form-control-sm"
                        type="password"
                        id="inputPassword1"
                        placeholder="1234"
                      />
                    </div>
                    <div className="form-group col-md-2">
                      <label>
                        &nbsp; &nbsp;
                    </label>
                      <button className="btn btn-primary btn-sm" type="submit">
                        Log in
                    </button>
                    </div>
                  </div>
                </form>
              </OptionallyDisplayed>
            </div>
          </nav>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route path="/register" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/network" component={Dashboard} />
            <Redirect path="*" to="/" />
          </Switch>
          <Footer/>
        </div>
      </Router>
    );
  }
}