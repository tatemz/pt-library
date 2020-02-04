import {
  LOAD_LIBRARY,
  LOAD_LIBRARY_SUCCESS,
  LOAD_LIBRARY_FAILURE,
  ADD_BOOK,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAILURE,
  CHECK_BOOK,
  CHECK_BOOK_SUCCESS,
  CHECK_BOOK_FAILURE,
  CHECK_BOOK_METHOD_OUT,
} from '../constants';

import {
  loadLibrary,
  loadLibrarySuccess,
  loadLibraryFailure,
  addBook,
  addBookSuccess,
  addBookFailure,
  checkBook,
  checkBookSuccess,
  checkBookFailure,
} from '../actions';

describe('Home Actions', () => {
  describe('loadLibrary', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOAD_LIBRARY,
      };

      expect(loadLibrary()).toEqual(expectedResult);
    });
  });

  describe('loadLibrarySuccess', () => {
    it('should return the correct type and pass books', () => {
      const books = [{ title: 'The Adventures of Foo Bar' }];
      const expectedResult = {
        type: LOAD_LIBRARY_SUCCESS,
        books,
      };

      expect(loadLibrarySuccess(books)).toEqual(expectedResult);
    });
  });

  describe('loadLibraryFailure', () => {
    it('should return the correct type and pass the error', () => {
      const error = Error('Foo bar');
      const expectedResult = {
        type: LOAD_LIBRARY_FAILURE,
        error,
      };

      expect(loadLibraryFailure(error)).toEqual(expectedResult);
    });
  });

  describe('addBook', () => {
    it('should return the correct type and pass book', () => {
      const book = { title: 'The Adventures of Foo Bar' };
      const expectedResult = {
        type: ADD_BOOK,
        book,
      };

      expect(addBook(book)).toEqual(expectedResult);
    });
  });

  describe('addBookSuccess', () => {
    it('should return the correct type and pass books', () => {
      const book = { title: 'The Adventures of Foo Bar' };
      const expectedResult = {
        type: ADD_BOOK_SUCCESS,
        book,
      };

      expect(addBookSuccess(book)).toEqual(expectedResult);
    });
  });

  describe('addBookFailure', () => {
    it('should return the correct type and pass the error', () => {
      const error = Error('Foo bar');
      const expectedResult = {
        type: ADD_BOOK_FAILURE,
        error,
      };

      expect(addBookFailure(error)).toEqual(expectedResult);
    });
  });

  describe('checkBook', () => {
    it('should return the correct type, book, and check book method', () => {
      const book = { title: 'The Adventures of Foo Bar' };
      const method = CHECK_BOOK_METHOD_OUT;

      const expectedResult = {
        type: CHECK_BOOK,
        book,
        method,
      };

      expect(checkBook(book, method)).toEqual(expectedResult);
    });
  });

  describe('checkBookSuccess', () => {
    it('should return the correct type and pass checked book', () => {
      const book = { title: 'The Adventures of Foo Bar' };
      const expectedResult = {
        type: CHECK_BOOK_SUCCESS,
        book,
      };

      expect(checkBookSuccess(book)).toEqual(expectedResult);
    });
  });

  describe('checkBookFailure', () => {
    it('should return the correct type and pass the error', () => {
      const book = { title: 'The Adventures of Foo Bar' };
      const error = Error('Foo bar');
      const expectedResult = {
        type: CHECK_BOOK_FAILURE,
        book,
        error,
      };

      expect(checkBookFailure(book, error)).toEqual(expectedResult);
    });
  });
});
