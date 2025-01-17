// import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from "./counter/counterSlice"

// export const store = configureStore({
//     reducer: {
//         counter: counterReducer
//     },
// })


import { configureStore, createSerializableStateInvariantMiddleware } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from "redux-persist"
import counterReducer from "./counter/counterSlice"
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, counterReducer);


const serializableMiddleware = createSerializableStateInvariantMiddleware({
    // Ignore these action types
    ignoredActions: ['persist/PERSIST'],
    // Ignore these paths in the action
    ignoredActionPaths: ['register', 'rehydrate'],
});

export const store = configureStore({
    reducer: {
        counter: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(serializableMiddleware),
})

export const persistor = persistStore(store);