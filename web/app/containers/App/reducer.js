import produce from 'immer';
import { CHECK_BOOK_SUCCESS as HOME_CHECK_BOOK_SUCCESS } from '../HomePage/constants';
import {
  ADD_BOOK_SUCCESS as MANAGE_ADD_BOOK_SUCCESS,
  DELETE_BOOK_SUCCESS as MANAGE_DELETE_BOOK_SUCCESS,
  UPDATE_BOOK_SUCCESS as MANAGE_UPDATE_BOOK_SUCCESS,
} from '../ManagePage/constants';
import {
  LOAD_LIBRARY,
  LOAD_LIBRARY_FAILURE,
  LOAD_LIBRARY_SUCCESS,
} from './constants';

export const initialState = {
  errors: [],
  library: {
    books: [],
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

      // Home page actions
      case HOME_CHECK_BOOK_SUCCESS:
        draft.library.books = draft.library.books.map(book =>
          book.isbn === action.book.isbn ? action.book : book,
        );
        break;

      // Manage page actions
      case MANAGE_ADD_BOOK_SUCCESS:
        draft.library.books.push(action.book);
        break;
      case MANAGE_UPDATE_BOOK_SUCCESS:
        draft.library.books = draft.library.books.map(book =>
          book.isbn === action.book.isbn ? action.book : book,
        );
        break;
      case MANAGE_DELETE_BOOK_SUCCESS:
        draft.library.books = draft.library.books.filter(
          book => book.isbn !== action.book.isbn,
        );
        break;
    }
  });
