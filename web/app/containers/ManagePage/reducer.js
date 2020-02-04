import produce from 'immer';
import {
  ADD_BOOK,
  ADD_BOOK_FAILURE,
  ADD_BOOK_SUCCESS,
  DELETE_BOOK,
  DELETE_BOOK_FAILURE,
  DELETE_BOOK_SUCCESS,
  UPDATE_BOOK,
  UPDATE_BOOK_FAILURE,
  UPDATE_BOOK_SUCCESS,
} from './constants';

export const initialState = {
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

/* eslint-disable no-param-reassign, default-case */
export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
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

      // Update book actions
      case UPDATE_BOOK:
        draft.updateBook.loading = true;
        break;
      case UPDATE_BOOK_SUCCESS:
        draft.updateBook.loading = false;
        draft.updateBook.book = action.book;
        break;
      case UPDATE_BOOK_FAILURE:
        draft.errors.push(action.error);
        break;

      // Delete book actions
      case DELETE_BOOK:
        draft.deleteBook.loading = true;
        break;
      case DELETE_BOOK_SUCCESS:
        draft.deleteBook.loading = false;
        draft.deleteBook.book = action.book;
        break;
      case DELETE_BOOK_FAILURE:
        draft.errors.push(action.error);
        break;
    }
  });
