import produce from 'immer';

import homePageReducer from '../reducer';
import {
  loadLibrary,
  loadLibrarySuccess,
  loadLibraryFailure,
} from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('homePageReducer', () => {
  let state;
  const initialState = {
    library: {
      books: [],
      loading: false,
      error: null,
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
        draft.library = {
          ...initialState.library,
          loading: true,
        };
      });

      expect(homePageReducer(state, loadLibrary())).toEqual(expectedResult);
    });

    it('should successfully handle loaded library books', () => {
      const books = [{ title: 'The Adventures of Foo Bar' }];

      const expectedResult = produce(state, draft => {
        draft.library = {
          ...initialState.library,
          books,
        };
      });

      expect(homePageReducer(state, loadLibrarySuccess(books))).toEqual(
        expectedResult,
      );
    });

    it('should safely handle errors', () => {
      const error = Error('Foo bar');

      const expectedResult = produce(state, draft => {
        draft.library = {
          ...initialState.library,
          error,
        };
      });

      expect(homePageReducer(state, loadLibraryFailure(error))).toEqual(
        expectedResult,
      );
    });
  });
});
