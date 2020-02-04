import produce from 'immer';
import {
  CHECK_BOOK,
  CHECK_BOOK_FAILURE,
  CHECK_BOOK_SUCCESS,
} from './constants';

export const initialState = {
  errors: [],
  checkBookQueue: [],
};

/* eslint-disable no-param-reassign, default-case */
export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      // Check book actions
      case CHECK_BOOK:
        draft.checkBookQueue.push({
          book: action.book,
          method: action.method,
        });
        break;
      case CHECK_BOOK_SUCCESS:
        draft.checkBookQueue = draft.checkBookQueue.filter(
          ({ book }) => book.isbn !== action.book.isbn,
        );
        break;
      case CHECK_BOOK_FAILURE:
        draft.checkBookQueue = draft.checkBookQueue.filter(
          ({ book }) => book.isbn !== action.book.isbn,
        );
        draft.errors.push(action.error);
        break;
    }
  });
