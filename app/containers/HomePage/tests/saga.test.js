/**
 * Tests for HomePage sagas
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import { checkBookFailure, checkBookSuccess } from '../actions';
import { CHECK_BOOK, CHECK_BOOK_METHOD_IN } from '../constants';
import homePageSagas, { checkBookSaga } from '../saga';

describe('checkBookSaga', () => {
  let checkBook;
  let checkBookGenerator;
  let callCheckBooksDescriptor;
  const mockBook = { isbn: '123', checked: true };

  beforeEach(() => {
    checkBook = jest.fn();
    checkBookGenerator = checkBookSaga(checkBook, {
      book: mockBook,
      method: CHECK_BOOK_METHOD_IN,
    });
    callCheckBooksDescriptor = checkBookGenerator.next();
  });

  it('should dispatch the checkout checkBookSuccess action if it requests the data successfully', () => {
    checkBook.mockResolvedValue(mockBook);

    expect(callCheckBooksDescriptor.value).toEqual(
      call(checkBook, mockBook.isbn, CHECK_BOOK_METHOD_IN),
    );

    const putDescriptor = checkBookGenerator.next(mockBook);
    expect(putDescriptor.value).toEqual(
      put(checkBookSuccess({ ...mockBook, checked: true })),
    );
    expect(checkBookGenerator.next().done).toBe(true);
  });

  it('should call the checkBookFailure action if the response errors', () => {
    checkBookGenerator.next();
    const error = Error('Foo');
    const putDescriptor = checkBookGenerator.throw(error);
    expect(putDescriptor.value).toEqual(put(checkBookFailure(mockBook, error)));
    expect(checkBookGenerator.next().done).toBe(true);
  });
});

describe('homePageSagas', () => {
  const homePageSagasGenerator = homePageSagas();

  it('should start task to watch for watched actions', () => {
    const allDescriptor = homePageSagasGenerator.next();
    expect(JSON.stringify(allDescriptor.value)).toEqual(
      JSON.stringify(
        takeEvery(CHECK_BOOK, checkBookSaga, null), // just ensuring we are passing a dependency
      ),
    );
    expect(homePageSagasGenerator.next().done).toBe(true);
  });
});
