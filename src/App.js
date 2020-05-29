import React, { Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "./utils/history";
import "./css/main.css";
import Home from "./pages/Home";
import Callback from "./pages/Callback";
import login from "./pages/login";
import signup from "./pages/signup";
import snippet from "./pages/snippet";
import Mentors from "./pages/Mentors";
import Coders from "./pages/Coders";
import Navbar from "./components/Navbar";

import Auth from "./Auth/Auth";

// import login from './pages/login'
// import signup from './pages/signup'
// import Navbar from './components/Navbar'

class App extends Component {
    constructor(props) {
        super(props);
        this.auth = new Auth(history); // note that pluralsight tutorial deals with his very differently
    }

    render() {
        return (
            <Router history={history}>
                <Navbar auth={this.auth} />
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={(props) => <Home auth={this.auth} {...props} />}
                    />
                    <Route
                        exact
                        path="/callback"
                        render={(props) => (
                            <Callback auth={this.auth} {...props} />
                        )}
                    />
                    <Route exact path="/login" component={login} />
                    <Route
                        exact
                        path={`/signup/:usertype`}
                        component={signup}
                    />
                    <Route exact path="/snippet" component={snippet} />
                    <Route
                        exact
                        path="/mentors"
                        render={(props) =>
                            this.auth.isAuthenticated() ? (
                                <Mentors auth={this.auth} {...props} />
                            ) : (
                                <Redirect to="/" />
                            )
                        }
                    />
                    <Route
                        exact
                        path="/coders"
                        render={(props) =>
                            this.auth.isAuthenticated() ? (
                                <Coders auth={this.auth} {...props} />
                            ) : (
                                <Redirect to="/" />
                            )
                        }
                    />
                </Switch>
            </Router>
        );
    }
}

export default App;
