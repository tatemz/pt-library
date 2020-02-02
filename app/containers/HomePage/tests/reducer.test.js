import produce from 'immer';

import homePageReducer from '../reducer';
import {
  loadLibrary,
  loadLibrarySuccess,
  loadLibraryFailure,
  addBook,
  addBookSuccess,
  addBookFailure,
} from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('homePageReducer', () => {
  let state;
  const initialState = {
    errors: [],
    library: {
      books: [],
      loading: false,
    },
    addBook: {
      book: null,
      loading: false,
    },
  };

  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(homePageReducer(undefined, {})).toEqual(expectedResult);
  });

  describe('LOAD_LIBRARY', () => {
    it('should start loadLibrary', () => {
      const expectedResult = produce(state, draft => {
        draft.library.loading = true;
      });

      expect(homePageReducer(state, loadLibrary())).toEqual(expectedResult);
    });

    it('should successfully handle loaded library books', () => {
      const books = [{ title: 'The Adventures of Foo Bar' }];

      const expectedResult = produce(state, draft => {
        draft.library.loading = false;
        draft.library.books = books;
      });

      expect(homePageReducer(state, loadLibrarySuccess(books))).toEqual(
        expectedResult,
      );
    });

    it('should safely handle errors', () => {
      const error = Error('Foo bar');

      const expectedResult = produce(state, draft => {
        draft.library.loading = false;
        draft.errors.push(error);
      });

      expect(homePageReducer(state, loadLibraryFailure(error))).toEqual(
        expectedResult,
      );
    });
  });

  describe('ADD_BOOK', () => {
    it('should start addBook', () => {
      const expectedResult = produce(state, draft => {
        draft.addBook.loading = true;
      });

      expect(homePageReducer(state, addBook())).toEqual(expectedResult);
    });

    it('should successfully handle adding a new book', () => {
      const book = { title: 'The Adventures of Foo Bar' };

      const expectedResult = produce(state, draft => {
        draft.addBook.loading = false;
        draft.addBook.book = book;
      });

      expect(homePageReducer(state, addBookSuccess(book))).toEqual(
        expectedResult,
      );
    });

    it('should safely handle errors', () => {
      const error = Error('Foo bar');

      const expectedResult = produce(state, draft => {
        draft.addBook.loading = false;
        draft.errors.push(error);
      });

      expect(homePageReducer(state, addBookFailure(error))).toEqual(
        expectedResult,
      );
    });
  });
});
