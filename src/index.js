import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider } from './react-auth0-spa';
import config from './auth_config.json';
import history from './utils/history';



// function from auth0 getting started
// routes user to the right place after login

const onRedirectCallback = appState => {
    history.push(
        appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
};


ReactDOM.render(
    <Auth0Provider domain={config.domain} client_id={config.clientId} redirect_uri={window.location.origin} onRedirectCallback={onRedirectCallback}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Auth0Provider>,
  document.getElementById('root')
);

