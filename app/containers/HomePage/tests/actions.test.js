import {
  LOAD_LIBRARY,
  LOAD_LIBRARY_SUCCESS,
  LOAD_LIBRARY_FAILURE,
} from '../constants';

import {
  loadLibrary,
  loadLibrarySuccess,
  loadLibraryFailure,
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
});
