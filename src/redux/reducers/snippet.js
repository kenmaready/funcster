import { SNIPPET } from "../types";

const defaultSnippet = {
    snippet: {
        id: null,
        name: "",
        code: "",
        needsReview: false,
        exists: true,
    },
    loading: false,
};

const snippetReducer = (state = defaultSnippet, action) => {
    switch (action.type) {
        case SNIPPET.LOADING:
            return { ...state, loading: true };
        case SNIPPET.SUCCESS:
            return { ...state, snippet: action.payload, loading: false };
        case SNIPPET.CLEAR:
            return { ...defaultSnippet };
        default:
            return state;
    }
};

export default snippetReducer;
