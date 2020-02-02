/**
 * Tests for HomePage sagas
 */

import { put, takeLatest, all } from 'redux-saga/effects';
import {
  loadLibraryFailure,
  loadLibrarySuccess,
  addBookFailure,
  addBookSuccess,
} from '../actions';
import { LOAD_LIBRARY, ADD_BOOK, DEFAULT_BOOKS, NEW_BOOK } from '../constants';

import homePageSagas, { loadLibrarySaga, addBookSaga } from '../saga';

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

describe('homePageSagas', () => {
  const homePageSagasGenerator = homePageSagas();

  it('should start task to watch for LOAD_REPOS action', () => {
    const allDescriptor = homePageSagasGenerator.next();
    expect(allDescriptor.value).toEqual(
      all([
        takeLatest(LOAD_LIBRARY, loadLibrarySaga),
        takeLatest(ADD_BOOK, addBookSaga),
      ]),
    );
    expect(homePageSagasGenerator.next().done).toBe(true);
  });
});
