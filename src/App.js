import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";
import "./css/main.css";
import Home from "./pages/Home";
import Callback from "./pages/Callback";
import login from "./pages/login";
import signup from "./pages/signup";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import SnippetEditor from "./pages/SnippetEditor";
import Error from "./pages/error";

import AuthRoute from "./AuthRoute";
import AuthContext from "./AuthContext";
import auth from "./utils/auth";

// import login from './pages/login'
// import signup from './pages/signup'
// import Navbar from './components/Navbar'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: auth, // note that pluralsight tutorial deals with his very differently
            tokenRenewalComplete: false,
        };
    }

    componentDidMount() {
        this.state.auth.renewToken(() => {
            this.setState({ tokenRenewalComplete: true });
        });
    }

    render() {
        const { auth } = this.state;
        if (!this.state.tokenRenewalComplete)
            return (
                <div>
                    <Navbar auth={auth} />
                    <div className="main-page container-fluid">
                        <Loading />
                    </div>
                </div>
            );
        return (
            <AuthContext.Provider value={auth}>
                <Router history={history}>
                    <Navbar auth={auth} />
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={(props) => <Home {...props} />}
                        />
                        <Route
                            exact
                            path="/callback"
                            render={(props) => (
                                <Callback auth={auth} {...props} />
                            )}
                        />
                        <Route exact path="/login" component={login} />
                        <Route
                            exact
                            path={`/signup/:usertype`}
                            component={signup}
                        />
                        <AuthRoute
                            exact
                            path="/snippet/:snippetId"
                            component={SnippetEditor}
                        />
                        <Route
                            exact
                            path="/error/:errorCode"
                            component={Error}
                        />
                    </Switch>
                </Router>
            </AuthContext.Provider>
        );
    }
}

export default App;
