import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
// import usersReducer from "../slices/usersSlice";




export const store = configureStore({
  reducer: combineReducers ({
    user: userReducer,
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
