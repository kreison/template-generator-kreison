import {
  AnyAction,
  EnhancedStore,
  Store,
  ThunkDispatch,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import { requester } from 'app/config/requester/requester';


const reducers = combineReducers({});
export const createReduxStore = (): EnhancedStore => {

  return configureStore({
    reducer: reducers,
    devTools: __IS_DEV__,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ thunk: { extraArgument: requester } }),
  });
};


export type RootState = ReturnType<typeof reducers>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
export type AppStore = Omit<Store<RootState, AnyAction>, 'dispatch'> & {
  dispatch: AppThunkDispatch;
};

export const store = createReduxStore();
