import produce from 'immer';
import {
  addBook,
  addBookFailure,
  addBookSuccess,
  updateBook,
  updateBookSuccess,
  updateBookFailure,
  deleteBook,
  deleteBookSuccess,
  deleteBookFailure,
} from '../actions';
import managePageReducer from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('managePageReducer', () => {
  let state;
  const initialState = {
    errors: [],
    addBook: {
      book: null,
      loading: false,
    },
    updateBook: {
      book: null,
      loading: false,
    },
    deleteBook: {
      book: null,
      loading: false,
    },
  };

  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(managePageReducer(undefined, {})).toEqual(expectedResult);
  });

  describe('ADD_BOOK', () => {
    it('should start addBook', () => {
      const expectedResult = produce(state, draft => {
        draft.addBook.loading = true;
      });

      expect(managePageReducer(state, addBook())).toEqual(expectedResult);
    });

    it('should successfully handle adding a new book', () => {
      const book = { title: 'The Adventures of Foo Bar' };

      const expectedResult = produce(state, draft => {
        draft.addBook.loading = false;
        draft.addBook.book = book;
      });

      expect(managePageReducer(state, addBookSuccess(book))).toEqual(
        expectedResult,
      );
    });

    it('should safely handle errors', () => {
      const error = Error('Foo bar');

      const expectedResult = produce(state, draft => {
        draft.addBook.loading = false;
        draft.errors.push(error);
      });

      expect(managePageReducer(state, addBookFailure(error))).toEqual(
        expectedResult,
      );
    });
  });

  describe('UPDATE_BOOK', () => {
    it('should start updateBook', () => {
      const expectedResult = produce(state, draft => {
        draft.updateBook.loading = true;
      });

      expect(managePageReducer(state, updateBook())).toEqual(expectedResult);
    });

    it('should successfully handle adding a new book', () => {
      const book = { title: 'The Adventures of Foo Bar' };

      const expectedResult = produce(state, draft => {
        draft.updateBook.loading = false;
        draft.updateBook.book = book;
      });

      expect(managePageReducer(state, updateBookSuccess(book))).toEqual(
        expectedResult,
      );
    });

    it('should safely handle errors', () => {
      const error = Error('Foo bar');

      const expectedResult = produce(state, draft => {
        draft.updateBook.loading = false;
        draft.errors.push(error);
      });

      expect(managePageReducer(state, updateBookFailure(error))).toEqual(
        expectedResult,
      );
    });
  });

  describe('DELETE_BOOK', () => {
    it('should start deleteBook', () => {
      const expectedResult = produce(state, draft => {
        draft.deleteBook.loading = true;
      });

      expect(managePageReducer(state, deleteBook())).toEqual(expectedResult);
    });

    it('should successfully handle adding a new book', () => {
      const book = { title: 'The Adventures of Foo Bar' };

      const expectedResult = produce(state, draft => {
        draft.deleteBook.loading = false;
        draft.deleteBook.book = book;
      });

      expect(managePageReducer(state, deleteBookSuccess(book))).toEqual(
        expectedResult,
      );
    });

    it('should safely handle errors', () => {
      const error = Error('Foo bar');

      const expectedResult = produce(state, draft => {
        draft.deleteBook.loading = false;
        draft.errors.push(error);
      });

      expect(managePageReducer(state, deleteBookFailure(error))).toEqual(
        expectedResult,
      );
    });
  });
});
