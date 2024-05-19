import { configureStore } from "@reduxjs/toolkit";
import catsReducer from "./catSlice";
import createSagaMiddleware from "redux-saga";
import catSaga from "./catSaga";

const saga = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        cats: catsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(saga),
});

saga.run(catSaga);
