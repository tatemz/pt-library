import { createSelector } from 'reselect';
import { APP_KEY } from './constants';
import { initialState } from './reducer';

const selectRouter = state => state.router;

export { makeSelectLocation };

export const selectApp = state => (state && state[APP_KEY]) || initialState;

export const selectAppLibrary = state =>
  selectApp(state).library || initialState.library;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

export const makeSelectErrors = () =>
  createSelector(
    selectApp,
    appState => appState.errors,
  );

export const makeSelectLibraryBooks = () =>
  createSelector(
    selectAppLibrary,
    libraryState => libraryState.books,
  );

export const makeSelectLibraryLoading = () =>
  createSelector(
    selectAppLibrary,
    libraryState => libraryState.loading,
  );
