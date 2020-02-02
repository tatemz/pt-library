import {
  LOAD_LIBRARY,
  LOAD_LIBRARY_SUCCESS,
  LOAD_LIBRARY_FAILURE,
  ADD_BOOK,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAILURE,
  CHECK_BOOK,
  CHECK_BOOK_SUCCESS,
  CHECK_BOOK_FAILURE,
} from './constants';

export function loadLibrary() {
  return {
    type: LOAD_LIBRARY,
  };
}

export function loadLibrarySuccess(books) {
  return {
    type: LOAD_LIBRARY_SUCCESS,
    books,
  };
}

export function loadLibraryFailure(error) {
  return {
    type: LOAD_LIBRARY_FAILURE,
    error,
  };
}

export function addBook() {
  return {
    type: ADD_BOOK,
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
