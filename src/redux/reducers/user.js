import { PROFILE } from "../types";

const defaultUser = {
    profile: {},
    loading: false,
};

const userReducer = (state = defaultUser, action) => {
    switch (action.type) {
        case PROFILE.LOADING:
            return { ...state, loading: true };
        case PROFILE.SUCCESS:
            return { ...state, profile: action.payload, loading: false };
        default:
            return state;
    }
};

export default userReducer;
