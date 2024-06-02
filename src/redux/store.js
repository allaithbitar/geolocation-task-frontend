import { configureStore } from "@reduxjs/toolkit";
import inputsReducer from "@/redux/slices/inputsSlice";
import persistStore from "redux-persist/es/persistStore";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { geolocationApi } from "./rtk-query";

const store = configureStore({
  reducer: {
    inputs: persistReducer({ key: "inputs", storage }, inputsReducer),
    [geolocationApi.reducerPath]: geolocationApi.reducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: false,
    }).concat(geolocationApi.middleware),
});

export const persistor = persistStore(store);

export default store;
