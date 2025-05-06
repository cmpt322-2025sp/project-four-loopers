// src/store.js
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./auth";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    version: 1,
    storage: storage,
  },
  rootReducer
);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) => [getDefaultMiddleware({
//     serializableCheck: {
//       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//     },
//   }).concat(logger)],
// });


export default() => {

  let store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(),],
  })
  
  let persistor = persistStore(store);
  
  return { store, persistor };
}