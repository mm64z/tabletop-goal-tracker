import { configureStore } from "@reduxjs/toolkit";
import { GoalReducer } from "../Goals/state/reducer";
import { persistCombineReducers, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
  whitelist: ['goal'],
}

const initialState = {app: {}};

const persistedReducer = persistCombineReducers(persistConfig, {
  goal: GoalReducer,
});

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ['core.allPals']
      },
      immutableCheck: {
        // Ignore state paths
        ignoredPaths: ['core.allPals']
      }
    }),
  })

export const persistor = persistStore(store)
export default store;