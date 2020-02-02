import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { HOME_PAGE_KEY } from './constants';

export const selectHomePage = state =>
  (state && state[HOME_PAGE_KEY]) || initialState;

export const selectHomePageLibrary = state =>
  selectHomePage(state).library || initialState.library;

export const selectHomePageAddBook = state =>
  selectHomePage(state).addBook || initialState.addBook;

export const selectHomePageCheckBookQueue = state =>
  selectHomePage(state).checkBookQueue || initialState.checkBookQueue;

export const makeSelectErrors = () =>
  createSelector(
    selectHomePage,
    homePageState => homePageState.errors,
  );

export const makeSelectLibraryBooks = () =>
  createSelector(
    selectHomePageLibrary,
    libraryState => libraryState.books,
  );

export const makeSelectLibraryLoading = () =>
  createSelector(
    selectHomePageLibrary,
    libraryState => libraryState.loading,
  );

export const makeSelectAddingBook = () =>
  createSelector(
    selectHomePageAddBook,
    addBookState => addBookState.loading,
  );

export const makeSelectCheckBookQueue = () =>
  createSelector(
    selectHomePageCheckBookQueue,
    checkBookQueue => checkBookQueue,
  );
