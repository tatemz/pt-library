import { createSelector } from 'reselect';
import { HOME_PAGE_KEY } from './constants';
import { initialState } from './reducer';

export const selectHomePage = state =>
  (state && state[HOME_PAGE_KEY]) || initialState;

export const selectHomePageCheckBookQueue = state =>
  selectHomePage(state).checkBookQueue || initialState.checkBookQueue;

export const makeSelectErrors = () =>
  createSelector(
    selectHomePage,
    homePageState => homePageState.errors,
  );

export const makeSelectCheckBookQueue = () =>
  createSelector(
    selectHomePageCheckBookQueue,
    checkBookQueue => checkBookQueue,
  );
