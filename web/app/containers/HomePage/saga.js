import { call, put, takeEvery } from 'redux-saga/effects';
import {
  checkBook,
  createLibraryService,
} from '../../repository/libraryService';
import { checkBookFailure, checkBookSuccess } from './actions';
import { CHECK_BOOK } from './constants';

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
  yield takeEvery(CHECK_BOOK, checkBookSaga, (...args) =>
    checkBook(...args, libraryService),
  );
}
