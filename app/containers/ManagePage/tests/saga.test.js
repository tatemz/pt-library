/**
 * Tests for HomePage sagas
 */

import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  addBookFailure,
  addBookSuccess,
  deleteBookFailure,
  deleteBookSuccess,
  updateBookFailure,
  updateBookSuccess,
} from '../actions';
import { ADD_BOOK, DELETE_BOOK, UPDATE_BOOK } from '../constants';
import managePageSagas, {
  addBookSaga,
  deleteBookSaga,
  updateBookSaga,
} from '../saga';

describe('addBookSaga', () => {
  let createBook;
  let addBookGenerator;
  let callCreateBooksDescriptor;
  const mockBook = { isbn: '123' };

  beforeEach(() => {
    createBook = jest.fn();
    addBookGenerator = addBookSaga(createBook, { book: mockBook });
    callCreateBooksDescriptor = addBookGenerator.next();
  });

  it('should dispatch the addBookSuccess action if it requests the data successfully', () => {
    createBook.mockResolvedValue(mockBook);

    expect(callCreateBooksDescriptor.value).toEqual(call(createBook, mockBook));

    const putDescriptor = addBookGenerator.next(mockBook);
    expect(putDescriptor.value).toEqual(put(addBookSuccess(mockBook)));
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

describe('updateBookSaga', () => {
  let updateBook;
  let updateBookGenerator;
  let callCreateBooksDescriptor;
  const mockBook = { isbn: '123' };

  beforeEach(() => {
    updateBook = jest.fn();
    updateBookGenerator = updateBookSaga(updateBook, { book: mockBook });
    callCreateBooksDescriptor = updateBookGenerator.next();
  });

  it('should dispatch the updateBookSuccess action if it requests the data successfully', () => {
    updateBook.mockResolvedValue(mockBook);

    expect(callCreateBooksDescriptor.value).toEqual(call(updateBook, mockBook));

    const putDescriptor = updateBookGenerator.next(mockBook);
    expect(putDescriptor.value).toEqual(put(updateBookSuccess(mockBook)));
    expect(updateBookGenerator.next().done).toBe(true);
  });

  it('should call the updateBookFailure action if the response errors', () => {
    updateBookGenerator.next();
    const error = Error('Foo');
    const putDescriptor = updateBookGenerator.throw(error);
    expect(putDescriptor.value).toEqual(put(updateBookFailure(error)));
    expect(updateBookGenerator.next().done).toBe(true);
  });
});

describe('deleteBookSaga', () => {
  let deleteBook;
  let deleteBookGenerator;
  let callCreateBooksDescriptor;
  const mockBook = { isbn: '123' };

  beforeEach(() => {
    deleteBook = jest.fn();
    deleteBookGenerator = deleteBookSaga(deleteBook, { book: mockBook });
    callCreateBooksDescriptor = deleteBookGenerator.next();
  });

  it('should dispatch the deleteBookSuccess action if it requests the data successfully', () => {
    deleteBook.mockResolvedValue(mockBook);

    expect(callCreateBooksDescriptor.value).toEqual(
      call(deleteBook, mockBook.isbn),
    );

    const putDescriptor = deleteBookGenerator.next(mockBook);
    expect(putDescriptor.value).toEqual(put(deleteBookSuccess(mockBook)));
    expect(deleteBookGenerator.next().done).toBe(true);
  });

  it('should call the deleteBookFailure action if the response errors', () => {
    deleteBookGenerator.next();
    const error = Error('Foo');
    const putDescriptor = deleteBookGenerator.throw(error);
    expect(putDescriptor.value).toEqual(put(deleteBookFailure(error)));
    expect(deleteBookGenerator.next().done).toBe(true);
  });
});

describe('managePageSagas', () => {
  const managePageSagasGenerator = managePageSagas();

  it('should start task to watch for watched actions', () => {
    const allDescriptor = managePageSagasGenerator.next();
    expect(JSON.stringify(allDescriptor.value)).toEqual(
      JSON.stringify(
        all([
          takeLatest(ADD_BOOK, addBookSaga, null),
          takeLatest(UPDATE_BOOK, updateBookSaga, null),
          takeLatest(DELETE_BOOK, deleteBookSaga, null),
        ]),
      ),
    );
    expect(managePageSagasGenerator.next().done).toBe(true);
  });
});
