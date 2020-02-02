import produce from 'immer';
import {
  LOAD_LIBRARY,
  LOAD_LIBRARY_SUCCESS,
  LOAD_LIBRARY_FAILURE,
  ADD_BOOK,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAILURE,
} from './constants';

export const initialState = {
  library: {
    books: [],
    loading: false,
    error: null,
  },
  addedBook: {
    book: null,
    loading: true,
    error: null,
  },
};

/* eslint-disable no-param-reassign, default-case */
export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_LIBRARY:
        draft.library.loading = true;
        break;
      case LOAD_LIBRARY_SUCCESS:
        draft.library = {
          ...initialState.library,
          books: action.books,
        };
        break;
      case LOAD_LIBRARY_FAILURE:
        draft.library = {
          ...initialState.library,
          error: action.error,
        };
        break;

      // Add book actions
      case ADD_BOOK:
        draft.addedBook.loading = true;
        break;
      case ADD_BOOK_SUCCESS:
        draft.addedBook = {
          ...initialState.addedBook,
          book: action.book,
        };
        break;
      case ADD_BOOK_FAILURE:
        draft.addedBook = {
          ...initialState.addedBook,
          error: action.error,
        };
        break;
    }
  });
