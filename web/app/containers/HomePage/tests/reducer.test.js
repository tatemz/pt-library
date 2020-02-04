import produce from 'immer';

import homePageReducer from '../reducer';
import { checkBook, checkBookSuccess, checkBookFailure } from '../actions';
import { CHECK_BOOK_METHOD_IN, CHECK_BOOK_METHOD_OUT } from '../constants';

/* eslint-disable default-case, no-param-reassign */
describe('homePageReducer', () => {
  let state;
  const initialState = {
    errors: [],
    checkBookQueue: [],
  };

  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(homePageReducer(undefined, {})).toEqual(expectedResult);
  });

  describe('CHECK_BOOK', () => {
    const bookFoo = { title: 'The Adventures of Foo', isbn: 123 };
    const bookBar = { title: 'The Adventures of Bar', isbn: 321 };

    it('should add a book to be checked in/out', () => {
      const prepopulatedState = {
        ...state,
        checkBookQueue: [{ book: bookFoo, method: CHECK_BOOK_METHOD_IN }],
      };

      const expectedResult = produce(prepopulatedState, draft => {
        draft.checkBookQueue.push({
          book: bookBar,
          method: CHECK_BOOK_METHOD_OUT,
        });
      });

      expect(
        homePageReducer(
          prepopulatedState,
          checkBook(bookBar, CHECK_BOOK_METHOD_OUT),
        ),
      ).toEqual(expectedResult);
    });

    it('should do nothing when successfully handlling checking in/out book when it is NOT present', () => {
      const prepopulatedState = {
        ...state,
        checkBookQueue: [{ book: bookFoo, method: CHECK_BOOK_METHOD_IN }],
      };

      // Do nothing if book is NOT present
      expect(
        homePageReducer(prepopulatedState, checkBookSuccess(bookBar)),
      ).toEqual(prepopulatedState);
    });

    it('should successfully handle checking in/out a book when it is present', () => {
      const prepopulatedState = {
        ...state,
        checkBookQueue: [{ book: bookFoo, method: CHECK_BOOK_METHOD_IN }],
      };

      const expectedResult = produce(prepopulatedState, draft => {
        draft.checkBookQueue = [];
      });

      // Do nothing if book is NOT present
      expect(
        homePageReducer(prepopulatedState, checkBookSuccess(bookBar)),
      ).toEqual(prepopulatedState);

      // Remove the book from queue and update it in the library if it is present
      expect(
        homePageReducer(
          prepopulatedState,
          checkBookSuccess({ ...bookFoo, foo: 'bar' }),
        ),
      ).toEqual(expectedResult);
    });

    it('should safely handle errors when book is NOT present', () => {
      const error = Error('Foo bar');
      const prepopulatedState = {
        ...state,
        checkBookQueue: [{ book: bookFoo, method: CHECK_BOOK_METHOD_IN }],
      };

      // Only add the error if book is NOT present
      const expectedErrorResult = produce(prepopulatedState, draft => {
        draft.errors.push(error);
      });

      expect(
        homePageReducer(prepopulatedState, checkBookFailure(bookBar, error)),
      ).toEqual(expectedErrorResult);
    });

    it('should safely handle errors when book is present', () => {
      const error = Error('Foo bar');
      const prepopulatedState = {
        ...state,
        checkBookQueue: [{ book: bookFoo, method: CHECK_BOOK_METHOD_IN }],
      };

      // Remove the book from queue if it is present
      const expectedResult = produce(prepopulatedState, draft => {
        draft.checkBookQueue = [];
        draft.errors.push(error);
      });

      expect(
        homePageReducer(prepopulatedState, checkBookFailure(bookFoo, error)),
      ).toEqual(expectedResult);
    });
  });
});
