import {
  LOAD_LIBRARY,
  LOAD_LIBRARY_SUCCESS,
  LOAD_LIBRARY_FAILURE,
  ADD_BOOK,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAILURE,
} from '../constants';

import {
  loadLibrary,
  loadLibrarySuccess,
  loadLibraryFailure,
  addBook,
  addBookSuccess,
  addBookFailure,
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
    it('should return the correct type', () => {
      const expectedResult = {
        type: ADD_BOOK,
      };

      expect(addBook()).toEqual(expectedResult);
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
});
