import { call, put, takeLatest } from 'redux-saga/effects';
import { loadLibraryFailure, loadLibrarySuccess } from '../actions';
import { LOAD_LIBRARY } from '../constants';
import appSagas, { loadLibrarySaga } from '../saga';

/* eslint-disable redux-saga/yield-effects */
describe('loadLibrarySaga', () => {
  let getBooks;
  let loadLibraryGenerator;
  let callGetBooksDescriptor;

  beforeEach(() => {
    getBooks = jest.fn();
    loadLibraryGenerator = loadLibrarySaga(getBooks);
    callGetBooksDescriptor = loadLibraryGenerator.next();
  });

  it('should dispatch the loadLibrarySuccess action if it requests the data successfully', async () => {
    const mockBooks = [{ isbn: '123' }];
    getBooks.mockResolvedValue(mockBooks);

    expect(callGetBooksDescriptor.value).toEqual(call(getBooks));

    const putDescriptor = loadLibraryGenerator.next(mockBooks);
    expect(putDescriptor.value).toEqual(put(loadLibrarySuccess(mockBooks)));
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

describe('appSagas', () => {
  const appSagasGenerator = appSagas();

  it('should start task to watch for watched actions', () => {
    const allDescriptor = appSagasGenerator.next();
    expect(JSON.stringify(allDescriptor.value)).toEqual(
      JSON.stringify(
        takeLatest(LOAD_LIBRARY, loadLibrarySaga, null), // just ensuring we are passing a dependency
      ),
    );
    expect(appSagasGenerator.next().done).toBe(true);
  });
});
