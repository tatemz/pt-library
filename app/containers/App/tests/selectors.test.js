import {
  makeSelectErrors,
  makeSelectLibraryBooks,
  makeSelectLibraryLoading,
  makeSelectLocation,
  selectApp,
  selectAppLibrary,
} from 'containers/App/selectors';
import { APP_KEY } from '../constants';
import { initialState } from '../reducer';

describe('makeSelectLocation', () => {
  it('should select the location', () => {
    const router = {
      location: { pathname: '/foo' },
    };
    const mockedState = {
      router,
    };
    expect(makeSelectLocation()(mockedState)).toEqual(router.location);
  });
});

describe('selectApp', () => {
  it('should select the home page state', () => {
    const homeState = 'Foo';
    const mockedState = {
      [APP_KEY]: homeState,
    };
    expect(selectApp(mockedState)).toBe(homeState);
  });

  it('should fallback to using the initial state', () => {
    expect(selectApp()).toBe(initialState);
    expect(selectApp({})).toBe(initialState);
  });
});

describe('selectAppLibrary', () => {
  it('should select the home page library substate', () => {
    const libaryState = 'Foo';
    const mockedState = {
      [APP_KEY]: {
        library: libaryState,
      },
    };
    expect(selectAppLibrary(mockedState)).toBe(libaryState);
  });

  it('should fallback to using the initial state', () => {
    expect(selectAppLibrary()).toBe(initialState.library);
    expect(selectAppLibrary({ [APP_KEY]: {} })).toBe(initialState.library);
  });
});

describe('makeSelectErrors', () => {
  const errorsSelector = makeSelectErrors();
  it('should select the home page errors ', () => {
    const errors = [Error('Foo')];
    const mockedState = {
      [APP_KEY]: {
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
      [APP_KEY]: {
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
      [APP_KEY]: {
        library: { loading: true },
      },
    };
    expect(libraryLoadingSelector(mockedState)).toBe(true);
  });
});
