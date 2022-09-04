import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { createRouterMiddleware, routerReducer } from 'connected-next-router';

import generalReducer from '../features/general';
// import { HYDRATE, createWrapper } from 'next-redux-wrapper'
// import { createBrowserHistory } from 'history';
// import Router from 'next/router'
// import thunk from 'redux-thunk';
import institutionReducer from '../features/institutions';

// const history = createBrowserHistory();
// const routerMiddleware = createRouterMiddleware(history);
const routerMiddleware = createRouterMiddleware();

export const store = configureStore({
  reducer: {
    instituion: institutionReducer,
    general: generalReducer,
    router: routerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(routerMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
