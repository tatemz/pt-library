import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createLibraryService,
  getBooks,
} from '../../repository/libraryService';
import { loadLibraryFailure, loadLibrarySuccess } from './actions';
import { LOAD_LIBRARY } from './constants';

export function* loadLibrarySaga(getBooksWrapper) {
  try {
    const books = yield call(getBooksWrapper);
    yield put(loadLibrarySuccess(books));
  } catch (err) {
    yield put(loadLibraryFailure(err));
  }
}

export default function* appSagas() {
  const libraryService = createLibraryService('http://localhost:8080');
  yield takeLatest(LOAD_LIBRARY, loadLibrarySaga, (...args) =>
    getBooks(...args, libraryService),
  );
}
