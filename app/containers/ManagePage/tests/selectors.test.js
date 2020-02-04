import {
  selectManagePage,
  selectManagePageAddBook,
  makeSelectErrors,
} from '../selectors';
import { MANAGE_PAGE_KEY } from '../constants';
import { initialState } from '../reducer';

describe('selectManagePage', () => {
  it('should select the manage page state', () => {
    const managePageState = 'Foo';
    const mockedState = {
      [MANAGE_PAGE_KEY]: managePageState,
    };
    expect(selectManagePage(mockedState)).toBe(managePageState);
  });

  it('should fallback to using the initial state', () => {
    expect(selectManagePage()).toBe(initialState);
    expect(selectManagePage({})).toBe(initialState);
  });
});

describe('selectManagePageAddBook', () => {
  it('should select the manage page addBook substate', () => {
    const addBookState = 'Foo';
    const mockedState = {
      [MANAGE_PAGE_KEY]: {
        addBook: addBookState,
      },
    };
    expect(selectManagePageAddBook(mockedState)).toBe(addBookState);
  });

  it('should fallback to using the initial state', () => {
    expect(selectManagePageAddBook()).toBe(initialState.addBook);
    expect(selectManagePageAddBook({ [MANAGE_PAGE_KEY]: {} })).toBe(
      initialState.addBook,
    );
  });
});

describe('makeSelectErrors', () => {
  const errorsSelector = makeSelectErrors();
  it('should select the managePage page errors ', () => {
    const errors = [Error('Foo')];
    const mockedState = {
      [MANAGE_PAGE_KEY]: {
        errors,
      },
    };
    expect(errorsSelector(mockedState)).toBe(errors);
  });
});
