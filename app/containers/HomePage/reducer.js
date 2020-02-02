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

/* eslint-disable no-param-reassign, default-case */
export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      // Load library actions actions
      case LOAD_LIBRARY:
        draft.library.loading = true;
        break;
      case LOAD_LIBRARY_SUCCESS:
        draft.library.loading = false;
        draft.library.books = action.books;
        break;
      case LOAD_LIBRARY_FAILURE:
        draft.errors.push(action.error);
        break;

      // Add book actions
      case ADD_BOOK:
        draft.addBook.loading = true;
        break;
      case ADD_BOOK_SUCCESS:
        draft.addBook.loading = false;
        draft.addBook.book = action.book;
        break;
      case ADD_BOOK_FAILURE:
        draft.errors.push(action.error);
        break;
    }
  });
