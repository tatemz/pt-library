import {
  CHECK_BOOK,
  CHECK_BOOK_FAILURE,
  CHECK_BOOK_SUCCESS,
} from './constants';

export function checkBook(book, method) {
  return {
    type: CHECK_BOOK,
    book,
    method,
  };
}

export function checkBookSuccess(book) {
  return {
    type: CHECK_BOOK_SUCCESS,
    book,
  };
}

export function checkBookFailure(book, error) {
  return {
    type: CHECK_BOOK_FAILURE,
    book,
    error,
  };
}
