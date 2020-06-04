import { CODERS } from "../types";

const defaultState = {
    coders: [],
    loading: false,
};

const codersReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CODERS.LOADING:
            return { ...state, loading: true };
        case CODERS.SUCCESS:
            return {
                ...state,
                coders: action.payload.coders,
                loading: false,
            };
        default:
            return state;
    }
};

export default codersReducer;
