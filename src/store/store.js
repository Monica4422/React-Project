import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import dashboardReducer from './slices/dashboardSlice';
import procurementReducer from './slices/procurementSlice';
import vendorReducer from './slices/vendorSlice';
import riskReducer from './slices/riskSlice';
import complianceReducer from './slices/complianceSlice';
import auditReducer from './slices/auditSlice';
import reportReducer from './slices/reportSlice';
import notificationReducer from './slices/notificationSlice';
import uiReducer from './slices/uiSlice';

const persistConfig = {
  key: 'e-grcp-root',
  storage,
  whitelist: ['auth', 'ui']
};

const rootReducer = {
  auth: authReducer,
  dashboard: dashboardReducer,
  procurement: procurementReducer,
  vendor: vendorReducer,
  risk: riskReducer,
  compliance: complianceReducer,
  audit: auditReducer,
  report: reportReducer,
  notification: notificationReducer,
  ui: uiReducer
};

const persistedReducer = persistReducer(persistConfig, (state, action) => {
  const combined = Object.keys(rootReducer).reduce((acc, key) => {
    acc[key] = rootReducer[key](state ? state[key] : undefined, action);
    return acc;
  }, {});
  return combined;
});

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);
