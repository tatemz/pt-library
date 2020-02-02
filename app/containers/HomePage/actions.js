import {
  LOAD_LIBRARY,
  LOAD_LIBRARY_SUCCESS,
  LOAD_LIBRARY_FAILURE,
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
