import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { rootStateType } from 'store';

export const useAppSelector: TypedUseSelectorHook<rootStateType> = useSelector;
