import { configureStore, getDefaultMiddleware , combineReducers} from '@reduxjs/toolkit';
import productReducer from '../features/productSlice';
import basketReducer from '../features/basketSlice';
import searchReducer from '../features/searchSlice';
import userReducer from '../features/userSlice';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {persistStore} from 'redux-persist';


const reducers = combineReducers({
   product : productReducer,
   basket : basketReducer,
   search : searchReducer,
   user : userReducer
})

const persistConfig = {
  key : 'root',
  storage,
}

const persistedReducer =  persistReducer(persistConfig,reducers);

export const store = configureStore({
  reducer : persistedReducer,
  middleware : getDefaultMiddleware({
    serializableCheck: false,
  })
}); 
export const persistor = persistStore(store);



