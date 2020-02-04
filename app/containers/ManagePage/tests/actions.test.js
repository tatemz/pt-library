import { addBook, addBookFailure, addBookSuccess } from '../actions';
import { ADD_BOOK, ADD_BOOK_FAILURE, ADD_BOOK_SUCCESS } from '../constants';

describe('ManagePage Actions', () => {
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
});
