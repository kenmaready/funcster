import { MENTORS } from "../types";

const defaultState = {
    mentors: [],
    loading: false,
};

const mentorsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case MENTORS.LOADING:
            return { ...state, loading: true };
        case MENTORS.SUCCESS:
            return {
                ...state,
                mentors: action.payload.mentors,
                loading: false,
            };
        default:
            return state;
    }
};

export default mentorsReducer;
