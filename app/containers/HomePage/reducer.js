import produce from 'immer';
import {
  LOAD_LIBRARY,
  LOAD_LIBRARY_SUCCESS,
  LOAD_LIBRARY_FAILURE,
} from './constants';

export const initialState = {
  library: {
    books: [],
    loading: false,
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
    }
  });
