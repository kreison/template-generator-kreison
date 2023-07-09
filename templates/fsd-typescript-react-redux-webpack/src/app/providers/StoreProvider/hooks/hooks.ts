import { AppThunkDispatch, RootState } from '../config/store';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';


export const useAppDispatch = (): AppThunkDispatch => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
