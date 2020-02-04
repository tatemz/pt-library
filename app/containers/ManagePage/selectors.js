import { createSelector } from 'reselect';
import { MANAGE_PAGE_KEY } from './constants';
import { initialState } from './reducer';

export const selectManagePage = state =>
  (state && state[MANAGE_PAGE_KEY]) || initialState;

export const selectManagePageAddBook = state =>
  selectManagePage(state).addBook || initialState.addBook;

export const makeSelectErrors = () =>
  createSelector(
    selectManagePage,
    homePageState => homePageState.errors,
  );
