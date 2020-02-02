/**
 * Tests for HomePage sagas
 */

import { all, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  addBookFailure,
  addBookSuccess,
  checkBookFailure,
  checkBookSuccess,
  loadLibraryFailure,
  loadLibrarySuccess,
} from '../actions';
import {
  ADD_BOOK,
  CHECK_BOOK,
  CHECK_BOOK_METHOD_IN,
  CHECK_BOOK_METHOD_OUT,
  DEFAULT_BOOKS,
  LOAD_LIBRARY,
  NEW_BOOK,
} from '../constants';
import homePageSagas, {
  addBookSaga,
  checkBookSaga,
  loadLibrarySaga,
} from '../saga';

/* eslint-disable redux-saga/yield-effects */
describe('loadLibrarySaga', () => {
  let loadLibraryGenerator;

  beforeEach(() => {
    loadLibraryGenerator = loadLibrarySaga();
  });

  it('should dispatch the loadLibrarySuccess action if it requests the data successfully', () => {
    const putDescriptor = loadLibraryGenerator.next();
    expect(putDescriptor.value).toEqual(put(loadLibrarySuccess(DEFAULT_BOOKS)));
    expect(loadLibraryGenerator.next().done).toBe(true);
  });

  it('should call the loadLibraryFailure action if the response errors', () => {
    loadLibraryGenerator.next();
    const error = Error('Foo');
    const putDescriptor = loadLibraryGenerator.throw(error);
    expect(putDescriptor.value).toEqual(put(loadLibraryFailure(error)));
    expect(loadLibraryGenerator.next().done).toBe(true);
  });
});

describe('addBookSaga', () => {
  let addBookGenerator;

  beforeEach(() => {
    addBookGenerator = addBookSaga();
  });

  it('should dispatch the addBookSuccess action if it requests the data successfully', () => {
    const putDescriptor = addBookGenerator.next();
    expect(putDescriptor.value).toEqual(put(addBookSuccess(NEW_BOOK)));
    expect(addBookGenerator.next().done).toBe(true);
  });

  it('should call the addBookFailure action if the response errors', () => {
    addBookGenerator.next();
    const error = Error('Foo');
    const putDescriptor = addBookGenerator.throw(error);
    expect(putDescriptor.value).toEqual(put(addBookFailure(error)));
    expect(addBookGenerator.next().done).toBe(true);
  });
});

describe('checkBookSaga', () => {
  let checkBookGenerator;
  const book = NEW_BOOK;

  beforeEach(() => {
    checkBookGenerator = checkBookSaga({ book });
  });

  it('should dispatch the checkout checkBookSuccess action if it requests the data successfully', () => {
    checkBookGenerator = checkBookSaga({ book, method: CHECK_BOOK_METHOD_OUT });
    const putDescriptor = checkBookGenerator.next();
    expect(putDescriptor.value).toEqual(
      put(checkBookSuccess({ ...book, checked: true })),
    );
    expect(checkBookGenerator.next().done).toBe(true);
  });

  it('should dispatch the checkin checkBookSuccess action if it requests the data successfully', () => {
    checkBookGenerator = checkBookSaga({ book, method: CHECK_BOOK_METHOD_IN });
    const putDescriptor = checkBookGenerator.next();
    expect(putDescriptor.value).toEqual(
      put(checkBookSuccess({ ...book, checked: false })),
    );
    expect(checkBookGenerator.next().done).toBe(true);
  });

  it('should call the checkBookFailure action if the response errors', () => {
    checkBookGenerator.next();
    const error = Error('Foo');
    const putDescriptor = checkBookGenerator.throw(error);
    expect(putDescriptor.value).toEqual(put(checkBookFailure(book, error)));
    expect(checkBookGenerator.next().done).toBe(true);
  });
});

describe('homePageSagas', () => {
  const homePageSagasGenerator = homePageSagas();

  it('should start task to watch for watched actions', () => {
    const allDescriptor = homePageSagasGenerator.next();
    expect(allDescriptor.value).toEqual(
      all([
        takeLatest(LOAD_LIBRARY, loadLibrarySaga),
        takeLatest(ADD_BOOK, addBookSaga),
        takeEvery(CHECK_BOOK, checkBookSaga),
      ]),
    );
    expect(homePageSagasGenerator.next().done).toBe(true);
  });
});
