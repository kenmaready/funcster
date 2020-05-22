import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import history from './history';
import './css/main.css';
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import NavBar from './components/Navbar';
// import login from './pages/login'
// import signup from './pages/signup'
// import Navbar from './components/Navbar'



class App extends Component {

    render() {
        return (
            <Router history={history}>
            <NavBar />
                <Switch>
                    <Route exact path="/" component={home}/>
                    <Route exact path="/login" component={login} />
                    <Route exact path="/signup" component={signup} />
 {/*                <Route exact path="/signup" component={signup} /> */}
                </Switch>
            </Router>
        );
    }
}

export default App;
