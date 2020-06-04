import auth0 from "auth0-js";
import axios from "axios";
import { BACKEND } from "../utils/config";
import auth from "../utils/auth";

const REDIRECT_ON_LOGIN = "redirect_on_login";

let _idToken = null;
let _accessToken = null;
let _scopes = null;
let _expiresAt = null;
let _username = null;

export default class Auth {
    constructor(history) {
        this.history = history;
        this.userProfile = null;
        this.snippet = null;
        this.auth0 = new auth0.WebAuth({
            domain: process.env.REACT_APP_AUTH0_DOMAIN,
            clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
            redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            responseType: "token id_token",
            scope: "openid profile email",
        });
    }


    login = () => {
        localStorage.setItem(
            REDIRECT_ON_LOGIN,
            JSON.stringify(this.history.location)
        );
        this.auth0.authorize();
    };

    logout = () => {
        this.auth0.logout({
            clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
            returnTo: process.env.REACT_APP_AUTH0_LOGOUT_RETURN,
        });
    };

    handleAuthentication = () => {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                const redirectLocation =
                    localStorage.getItem(REDIRECT_ON_LOGIN) === "undefined"
                        ? "/"
                        : JSON.parse(localStorage.getItem(REDIRECT_ON_LOGIN));
                this.history.push(redirectLocation);
            } else if (err) {
                this.history.push("/");
                console.error(err);
            }
            localStorage.removeItem(REDIRECT_ON_LOGIN);
        });
    };

    getAccessToken = () => {
        if (!_accessToken) {
            throw new Error(
                "No access token found. User is either logged out or access token has been removed from browser."
            );
        }
        console.log("accessToken obtained: ", _accessToken);
        return _accessToken;
    };

    getProfile = (cb) => {
        //if (this.userProfile) return cb(this.userProfile);
        const accessToken = this.getAccessToken();
        this.auth0.client.userInfo(accessToken, (err, profile) => {
            if (profile) {
                axios
                    .get(`${BACKEND}/userinfo/${profile.nickname}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    })
                    .then((response) => {
                        profile.userId = response.data.user_id;
                        profile.usertype = response.data.usertype;
                        if (response.data.mentor)
                            profile.mentor = response.data.mentor;
                        if (response.data.snippets)
                            profile.snippets = response.data.snippets;
                        if (response.data.coders)
                            profile.coders = response.data.coders;
                    })
                    .then((response) => {
                        this.userProfile = profile;
                        cb(profile, err);
                    });
            }
            cb(profile, err);
        });
    };

    getSnippet = (snippetId, cb) => {
        const accessToken = this.getAccessToken();
        axios
            .get(`${BACKEND}/snippet/${snippetId}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((response) => {
                const snippet = {
                    id: response.data.id,
                    name: response.data.snippet_name,
                    code: response.data.code,
                    coderId: response.data.coder_id,
                    needsReview: response.data.needs_review,
                    comments: response.data.comments,
                };
                this.snippet = snippet;
                cb(this.snippet);
            });
    };

    setSession = (authResult) => {
        _expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
        _scopes = authResult.scope || this.requestedScopes || "";
        _accessToken = authResult.accessToken;
        _idToken = authResult.idToken;
        this.scheduleTokenRenewal();
    };

    isAuthenticated() {
        return new Date().getTime() < _expiresAt;
    }

    renewToken(cb) {
        this.auth0.checkSession({}, (err, result) => {
            if (err) {
                console.log(`Error: ${err.error}: ${err.error_description}`);
            } else {
                this.setSession(result);
            }
            if (cb) cb(err, result);
        });
    }

    scheduleTokenRenewal() {
        const delay = _expiresAt - Date.now();
        if (delay > 0) setTimeout(() => this.renewToken(), delay);
    }
}
