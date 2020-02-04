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

export function addBook(book) {
  return {
    type: ADD_BOOK,
    book,
  };
}

export function addBookSuccess(book) {
  return {
    type: ADD_BOOK_SUCCESS,
    book,
  };
}

export function addBookFailure(error) {
  return {
    type: ADD_BOOK_FAILURE,
    error,
  };
}

export function deleteBook(book) {
  return {
    type: DELETE_BOOK,
    book,
  };
}

export function deleteBookSuccess(book) {
  return {
    type: DELETE_BOOK_SUCCESS,
    book,
  };
}

export function deleteBookFailure(error) {
  return {
    type: DELETE_BOOK_FAILURE,
    error,
  };
}

export function updateBook(book) {
  return {
    type: UPDATE_BOOK,
    book,
  };
}

export function updateBookSuccess(book) {
  return {
    type: UPDATE_BOOK_SUCCESS,
    book,
  };
}

export function updateBookFailure(error) {
  return {
    type: UPDATE_BOOK_FAILURE,
    error,
  };
}
