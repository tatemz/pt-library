/**
 * Gets the repositories of the user from Github
 */

import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  checkBook,
  createBook,
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
import { ADD_BOOK, CHECK_BOOK, LOAD_LIBRARY } from './constants';

export function* loadLibrarySaga(getBooksWrapper) {
  try {
    const books = yield call(getBooksWrapper);
    yield put(loadLibrarySuccess(books));
  } catch (err) {
    yield put(loadLibraryFailure(err));
  }
}

export function* addBookSaga(createBookWrapper, { book }) {
  try {
    const newBook = yield call(createBookWrapper, book);
    yield put(addBookSuccess(newBook));
  } catch (err) {
    yield put(addBookFailure(err));
  }
}

export function* checkBookSaga(checkBookWrapper, { book, method }) {
  try {
    const newBook = yield call(checkBookWrapper, book.isbn, method);
    yield put(checkBookSuccess(newBook));
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
    takeLatest(ADD_BOOK, addBookSaga, (...args) =>
      createBook(...args, libraryService),
    ),
    takeEvery(CHECK_BOOK, checkBookSaga, (...args) =>
      checkBook(...args, libraryService),
    ),
  ]);
}
