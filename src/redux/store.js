import { combineReducers, configureStore } from "@reduxjs/toolkit";
import dataReducer from "./reducers/dataReducer";
import bookingReducer from "./reducers/bookingReducer";
import ticketReducer from "./reducers/ticketReducer";
import passengersReducer from "./reducers/passengersReducer";
import profileReducer from "./reducers/profileReducer";

import filterReducer from "./reducers/filterReducer";
import authReducer from "./reducers/authReducer";
import sessionStorage from "redux-persist/lib/storage/session"; // sessionStorage for web

import { thunk } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
// import { payment } from "./action/paymentAction";
import paymentReducer from "./reducers/paymentReducer";

const rootReducers = combineReducers({
  data: dataReducer,
  ticket: ticketReducer,
  passengers: passengersReducer,
  profile: profileReducer,
  filter: filterReducer,
  auth: authReducer,
  payment: paymentReducer,
});

const persistConfig = {
  key: "root3",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});

export const persistor = persistStore(store);
