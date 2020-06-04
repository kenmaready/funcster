import { combineReducers } from "redux";
import user from "./user";
import snippet from "./snippet";
import mentors from "./mentors";
import coders from "./coders";

export default combineReducers({
    user,
    snippet,
    mentors,
    coders,
});
