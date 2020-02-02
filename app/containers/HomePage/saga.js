/**
 * Gets the repositories of the user from Github
 */

import { all, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  addBookFailure,
  addBookSuccess,
  checkBookFailure,
  checkBookSuccess,
  loadLibraryFailure,
  loadLibrarySuccess,
} from './actions';
import {
  ADD_BOOK,
  CHECK_BOOK,
  CHECK_BOOK_METHOD_OUT,
  DEFAULT_BOOKS,
  LOAD_LIBRARY,
  NEW_BOOK,
} from './constants';

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

export function* checkBookSaga({ book, method }) {
  try {
    const updatedBook = {
      ...book,
      checked: method === CHECK_BOOK_METHOD_OUT,
    };
    yield put(checkBookSuccess(updatedBook));
  } catch (err) {
    yield put(checkBookFailure(book, err));
  }
}

export default function* homePageSagas() {
  yield all([
    takeLatest(LOAD_LIBRARY, loadLibrarySaga),
    takeLatest(ADD_BOOK, addBookSaga),
    takeEvery(CHECK_BOOK, checkBookSaga),
  ]);
}
