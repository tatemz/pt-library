/**
 * Gets the repositories of the user from Github
 */

import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  createLibraryService,
  getBooks,
} from '../../repository/libraryService';
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
  LOAD_LIBRARY,
  NEW_BOOK,
} from './constants';

export function* loadLibrarySaga(getBooksWrapper) {
  try {
    const books = yield call(getBooksWrapper);
    yield put(loadLibrarySuccess(books));
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
  const libraryService = createLibraryService('http://localhost:8080');
  yield all([
    takeLatest(LOAD_LIBRARY, loadLibrarySaga, (...args) =>
      getBooks(...args, libraryService),
    ),
    takeLatest(ADD_BOOK, addBookSaga),
    takeEvery(CHECK_BOOK, checkBookSaga),
  ]);
}
