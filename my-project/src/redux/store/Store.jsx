import { persistStore, persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import tutorSlice from "../slice/TutorSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = {
  tutor: persistReducer(persistConfig, tutorSlice),
};

const Store = configureStore({
  reducer: rootReducer,
});
const persistor = persistStore(Store);

export { Store, persistor };
