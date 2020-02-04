import { checkBook, checkBookFailure, checkBookSuccess } from '../actions';
import {
  CHECK_BOOK,
  CHECK_BOOK_FAILURE,
  CHECK_BOOK_METHOD_OUT,
  CHECK_BOOK_SUCCESS,
} from '../constants';

describe('Home Actions', () => {
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
