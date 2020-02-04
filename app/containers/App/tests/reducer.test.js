import produce from 'immer';
import { checkBookSuccess } from '../../HomePage/actions';
import {
  deleteBookSuccess,
  updateBookSuccess,
  addBookSuccess,
} from '../../ManagePage/actions';
import {
  loadLibrary,
  loadLibraryFailure,
  loadLibrarySuccess,
} from '../actions';
import appReducer from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('appReducer', () => {
  let state;
  const initialState = {
    errors: [],
    library: {
      books: [],
      loading: false,
    },
  };

  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  describe('LOAD_LIBRARY', () => {
    it('should start loadLibrary', () => {
      const expectedResult = produce(state, draft => {
        draft.library.loading = true;
      });

      expect(appReducer(state, loadLibrary())).toEqual(expectedResult);
    });

    it('should successfully handle loaded library books', () => {
      const books = [{ title: 'The Adventures of Foo Bar' }];

      const expectedResult = produce(state, draft => {
        draft.library.loading = false;
        draft.library.books = books;
      });

      expect(appReducer(state, loadLibrarySuccess(books))).toEqual(
        expectedResult,
      );
    });

    it('should safely handle errors', () => {
      const error = Error('Foo bar');

      const expectedResult = produce(state, draft => {
        draft.library.loading = false;
        draft.errors.push(error);
      });

      expect(appReducer(state, loadLibraryFailure(error))).toEqual(
        expectedResult,
      );
    });
  });

  describe('HomePage CHECK_BOOK_SUCCESS', () => {
    it('should update the checked book in the library', () => {
      const book = { isbn: '123', checked: true };
      const newBook = { isbn: '123', checked: false };
      const populatedState = {
        ...state,
        library: { books: [book], loading: false },
      };
      const expectedResult = produce(state, draft => {
        draft.library.books = [newBook];
      });
      expect(appReducer(populatedState, checkBookSuccess(newBook))).toEqual(
        expectedResult,
      );
    });

    it('should do nothing if the checked book cannot be found', () => {
      const otherBook = { isbn: '321', checked: false };
      const newBook = { isbn: '123', checked: false };
      const populatedState = {
        ...state,
        library: { books: [otherBook], loading: false },
      };
      expect(appReducer(populatedState, checkBookSuccess(newBook))).toEqual(
        populatedState,
      );
    });
  });

  describe('ManagePage ADD_BOOK_SUCCESS', () => {
    it('should add the book to the library', () => {
      const newBook = { isbn: '123', checked: false };
      const populatedState = {
        ...state,
        library: { books: [], loading: false },
      };
      const expectedResult = produce(state, draft => {
        draft.library.books = [newBook];
      });
      expect(appReducer(populatedState, addBookSuccess(newBook))).toEqual(
        expectedResult,
      );
    });
  });

  describe('ManagePage UPDATE_BOOK_SUCCESS', () => {
    it('should update the book in the library', () => {
      const book = { isbn: '123', checked: true };
      const newBook = { isbn: '123', checked: false };
      const populatedState = {
        ...state,
        library: { books: [book], loading: false },
      };
      const expectedResult = produce(state, draft => {
        draft.library.books = [newBook];
      });
      expect(appReducer(populatedState, updateBookSuccess(newBook))).toEqual(
        expectedResult,
      );
    });

    it('should do nothing if the checked book cannot be found', () => {
      const otherBook = { isbn: '321', checked: false };
      const newBook = { isbn: '123', checked: false };
      const populatedState = {
        ...state,
        library: { books: [otherBook], loading: false },
      };
      expect(appReducer(populatedState, updateBookSuccess(newBook))).toEqual(
        populatedState,
      );
    });
  });

  describe('ManagePage DELETE_BOOK_SUCCESS', () => {
    it('should remove the book from the library', () => {
      const book = { isbn: '123', checked: true };
      const populatedState = {
        ...state,
        library: { books: [book], loading: false },
      };
      const expectedResult = produce(state, draft => {
        draft.library.books = [];
      });
      expect(appReducer(populatedState, deleteBookSuccess(book))).toEqual(
        expectedResult,
      );
    });
  });
});
