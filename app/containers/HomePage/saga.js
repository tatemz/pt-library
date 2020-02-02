/**
 * Gets the repositories of the user from Github
 */

import { put, takeLatest, all } from 'redux-saga/effects';
import {
  addBookFailure,
  addBookSuccess,
  loadLibraryFailure,
  loadLibrarySuccess,
} from './actions';
import { ADD_BOOK, LOAD_LIBRARY, NEW_BOOK, DEFAULT_BOOKS } from './constants';

export function* loadLibrarySaga() {
  try {
    yield put(loadLibrarySuccess(DEFAULT_BOOKS));
  } catch (err) {
    yield put(loadLibraryFailure(err));
  }
}

export function* addBookSaga() {
  try {
    yield put(addBookSuccess(NEW_BOOK));
  } catch (err) {
    yield put(addBookFailure(err));
  }
}

export default function* homePageSagas() {
  yield all([
    takeLatest(LOAD_LIBRARY, loadLibrarySaga),
    takeLatest(ADD_BOOK, addBookSaga),
  ]);
}
