import { combineReducers, configureStore } from "@reduxjs/toolkit";
import dataReducer from "./reducers/dataReducer";
import bookingReducer from "./reducers/bookingReducer";
import ticketReducer from "./reducers/ticketReducer";
import filterReducer from "./reducers/filterReducer";
import { thunk } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const rootReducers = combineReducers({
  data: dataReducer,
  booking: bookingReducer,
  ticket: ticketReducer,
  filter: filterReducer,
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
