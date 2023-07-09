import { createReduxStore } from './config/store';
import { StoreProvider } from './ui/StoreProvider';
import { useAppSelector, useAppDispatch } from './hooks/hooks';
import type { RootState } from './config/store';


export {
  RootState,
  createReduxStore,
  StoreProvider,
  useAppSelector,
  useAppDispatch,
};
