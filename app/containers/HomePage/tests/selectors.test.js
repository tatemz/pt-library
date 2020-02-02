import {
  selectHomePage,
  selectHomePageLibrary,
  selectHomePageAddBook,
  makeSelectErrors,
  makeSelectLibraryBooks,
  makeSelectLibraryLoading,
  makeSelectAddingBook,
} from '../selectors';
import { HOME_PAGE_KEY } from '../constants';
import { initialState } from '../reducer';

describe('selectHomePage', () => {
  it('should select the home page state', () => {
    const homeState = 'Foo';
    const mockedState = {
      [HOME_PAGE_KEY]: homeState,
    };
    expect(selectHomePage(mockedState)).toBe(homeState);
  });

  it('should fallback to using the initial state', () => {
    expect(selectHomePage()).toBe(initialState);
    expect(selectHomePage({})).toBe(initialState);
  });
});

describe('selectHomePageLibrary', () => {
  it('should select the home page library substate', () => {
    const libaryState = 'Foo';
    const mockedState = {
      [HOME_PAGE_KEY]: {
        library: libaryState,
      },
    };
    expect(selectHomePageLibrary(mockedState)).toBe(libaryState);
  });

  it('should fallback to using the initial state', () => {
    expect(selectHomePageLibrary()).toBe(initialState.library);
    expect(selectHomePageLibrary({ [HOME_PAGE_KEY]: {} })).toBe(
      initialState.library,
    );
  });
});

describe('selectHomePageAddBook', () => {
  it('should select the home page addBook substate', () => {
    const addBookState = 'Foo';
    const mockedState = {
      [HOME_PAGE_KEY]: {
        addBook: addBookState,
      },
    };
    expect(selectHomePageAddBook(mockedState)).toBe(addBookState);
  });

  it('should fallback to using the initial state', () => {
    expect(selectHomePageAddBook()).toBe(initialState.addBook);
    expect(selectHomePageAddBook({ [HOME_PAGE_KEY]: {} })).toBe(
      initialState.addBook,
    );
  });
});

describe('makeSelectErrors', () => {
  const errorsSelector = makeSelectErrors();
  it('should select the home page errors ', () => {
    const errors = [Error('Foo')];
    const mockedState = {
      [HOME_PAGE_KEY]: {
        errors,
      },
    };
    expect(errorsSelector(mockedState)).toBe(errors);
  });
});

describe('makeSelectLibraryBooks', () => {
  const libraryBooksSelector = makeSelectLibraryBooks();
  it('should select the makeSelectLibraryBooks', () => {
    const books = [{ title: 'The Adventures of Foo Bar' }];

    const mockedState = {
      [HOME_PAGE_KEY]: {
        library: { books },
      },
    };
    expect(libraryBooksSelector(mockedState)).toBe(books);
  });
});

describe('makeSelectLibraryLoading', () => {
  const libraryLoadingSelector = makeSelectLibraryLoading();
  it('should select the makeSelectLibraryLoading', () => {
    const mockedState = {
      [HOME_PAGE_KEY]: {
        library: { loading: true },
      },
    };
    expect(libraryLoadingSelector(mockedState)).toBe(true);
  });
});

describe('makeSelectAddingBook', () => {
  const addingBookSelector = makeSelectAddingBook();
  it('should select the makeSelectAddingBook', () => {
    const mockedState = {
      [HOME_PAGE_KEY]: {
        addBook: { loading: true },
      },
    };
    expect(addingBookSelector(mockedState)).toBe(true);
  });
});
