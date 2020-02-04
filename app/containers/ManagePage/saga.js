/**
 * Gets the repositories of the user from Github
 */

import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  createBook,
  createLibraryService,
  deleteBook,
  updateBook,
} from '../../repository/libraryService';
import {
  addBookFailure,
  addBookSuccess,
  deleteBookFailure,
  deleteBookSuccess,
  updateBookFailure,
  updateBookSuccess,
} from './actions';
import { ADD_BOOK, DELETE_BOOK, UPDATE_BOOK } from './constants';

export function* addBookSaga(createBookWrapper, { book }) {
  try {
    const newBook = yield call(createBookWrapper, book);
    yield put(addBookSuccess(newBook));
  } catch (err) {
    yield put(addBookFailure(err));
  }
}

export function* updateBookSaga(updateBookWrapper, { book }) {
  try {
    const newBook = yield call(updateBookWrapper, book);
    yield put(updateBookSuccess(newBook));
  } catch (err) {
    yield put(updateBookFailure(err));
  }
}

export function* deleteBookSaga(deleteBookWrapper, { book }) {
  try {
    yield call(deleteBookWrapper, book.isbn);
    yield put(deleteBookSuccess(book));
  } catch (err) {
    yield put(deleteBookFailure(err));
  }
}

export default function* homePageSagas() {
  const libraryService = createLibraryService('http://localhost:8080');
  yield all([
    takeLatest(ADD_BOOK, addBookSaga, (...args) =>
      createBook(...args, libraryService),
    ),
    takeLatest(UPDATE_BOOK, updateBookSaga, (...args) =>
      updateBook(...args, libraryService),
    ),
    takeLatest(DELETE_BOOK, deleteBookSaga, (...args) =>
      deleteBook(...args, libraryService),
    ),
  ]);
}
