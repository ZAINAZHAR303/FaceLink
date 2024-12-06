import { configureStore} from "@reduxjs/toolkit";
import feedReducer from "./slices/feedSlice";
import authReducer from "./slices/authSlice";
import Feed from "./slices/feedSlice"
// Add the reducer here


export const store = configureStore({
    reducer: {
        // feedSlice: feedReducer,
        authSlice: authReducer,
        feedSlice: Feed,
        // Add the reducer here 
    }});
    