import axios from "axios";
import history from "../../utils/history";
import auth from "../../utils/auth";
import { BACKEND } from "../../utils/config";
import { PROFILE, SNIPPET, MENTORS, CODERS } from "../types";

//----------------------------------------
// auth0-related actions
//----------------------------------------

export const login = () => (dispatch) => {
    auth.login();
};

export const logout = () => (dispatch) => {
    auth.logout();
};

export const handleAuthentication = () => (dispatch) => {
    auth.handleAuthentication();
};

export const isAuthenticated = () => (dispatch) => {
    return auth.isAuthenticated();
};

export const getProfile = () => (dispatch) => {
    dispatch({ type: PROFILE.LOADING });
    const accessToken = auth.getAccessToken();
    const profile = {};
    axios
        .get("https://funcster.auth0.com/userinfo", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then((response) => {
            profile.username = response.data.nickname;
            return axios.get(`${BACKEND}/userinfo/${profile.username}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        })
        .then((response) => {
            profile.userId = response.data.user_id;
            profile.usertype = response.data.usertype;
            if (response.data.mentor) profile.mentor = response.data.mentor;
            if (response.data.snippets)
                profile.snippets = response.data.snippets;
            if (response.data.coders) profile.coders = response.data.coders;
            dispatch({
                type: PROFILE.SUCCESS,
                payload: profile,
            });
        })
        .catch((error) => {
            console.error(error);
        });
};

export const getSnippet = (snippetId, cb) => (dispatch) => {
    dispatch({ type: SNIPPET.LOADING });
    const accessToken = auth.getAccessToken();
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
            dispatch({
                type: SNIPPET.SUCCESS,
                payload: snippet,
            });
            cb(snippet);
        });
};

export const clearSnippet = () => (dispatch) => {
    dispatch({ type: SNIPPET.CLEAR });
};

export const submitSnippet = (snippet, usertype, userId) => (dispatch) => {
    if (snippet.id === "new") {
        axios
            .post(
                `${BACKEND}/snippet`,
                {
                    name: snippet.name,
                    code: snippet.code,
                    needsReview: snippet.needsReview,
                    coderId: userId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${auth.getAccessToken()}`,
                    },
                }
            )
            .then((response) => history.push("/"))
            .catch((err) => console.error(err));
    } else {
        axios
            .patch(
                `${BACKEND}/snippet/${snippet.id}`,
                {
                    id: snippet.id,
                    name: snippet.name,
                    code: snippet.code,
                    coderId: snippet.coderId,
                    needsReview: snippet.needsReview,
                    comments: snippet.comments,
                    usertype,
                    userId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${auth.getAccessToken()}`,
                    },
                }
            )
            .then((response) => history.push("/"))
            .catch((err) => console.error(err));
    }
};

export const getMentors = () => (dispatch) => {
    dispatch({ type: MENTORS.LOADING });
    axios
        .get(`${BACKEND}/mentors`, {
            headers: {
                Authorization: `Bearer ${auth.getAccessToken()}`,
            },
        })
        .then((response) => {
            dispatch({
                type: MENTORS.SUCCESS,
                payload: response.data,
            });
        })
        .catch((err) => console.error(err));
};

export const selectMentor = (userId, mentorId) => (dispatch) => {
    dispatch({ type: MENTORS.LOADING });
    axios
        .patch(
            `${BACKEND}/coder/${userId}/mentor`,
            {
                mentorId,
            },
            {
                headers: {
                    Authorization: `Bearer ${auth.getAccessToken()}`,
                },
            }
        )
        .then((response) => {
            window.location.reload(false);
        })
        .catch((err) => console.error(err));
};

export const getAvailableCoders = () => (dispatch) => {
    dispatch({ type: CODERS.LOADING });
    axios
        .get(`${BACKEND}/coders/available`, {
            headers: {
                Authorization: `Bearer ${auth.getAccessToken()}`,
            },
        })
        .then((response) => {
            dispatch({
                type: CODERS.SUCCESS,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};

export const selectCoder = (userId, coderId) => (dispatch) => {
    dispatch({ type: CODERS.LOADING });
    axios
        .patch(
            `${BACKEND}/mentor/${userId}/coder`,
            {
                coderId,
            },
            {
                headers: {
                    Authorization: `Bearer ${auth.getAccessToken()}`,
                },
            }
        )
        .then((response) => {
            window.location.reload(false);
        })
        .catch((err) => console.error(err));
};
