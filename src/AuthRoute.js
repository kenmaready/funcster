import React from "react";
import { Route } from "react-router-dom";
import AuthContext from "./AuthContext";

// special authorized route wrapper to create render-prop routes with authorization requirements
function AuthRoute({ component: Component, usertype, ...rest }) {
    return (
        <AuthContext.Consumer>
            {(auth) => (
                <Route
                    {...rest}
                    render={(props) => {
                        // redirect to login screen if attempting to access without being logged in:
                        if (!auth.isAuthenticated()) return auth.login();

                        // otherwise, render the component:
                        return <Component auth={auth} {...props} />;
                    }}
                />
            )}
        </AuthContext.Consumer>
    );
}

export default AuthRoute;
