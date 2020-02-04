import {
  selectHomePage,
  makeSelectErrors,
  makeSelectCheckBookQueue,
  selectHomePageCheckBookQueue,
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

describe('selectHomePageCheckBookQueue', () => {
  it('should select the home page addBook substate', () => {
    const checkBookQueueState = 'Foo';
    const mockedState = {
      [HOME_PAGE_KEY]: {
        checkBookQueue: checkBookQueueState,
      },
    };
    expect(selectHomePageCheckBookQueue(mockedState)).toBe(checkBookQueueState);
  });

  it('should fallback to using the initial state', () => {
    expect(selectHomePageCheckBookQueue()).toBe(initialState.checkBookQueue);
    expect(selectHomePageCheckBookQueue({ [HOME_PAGE_KEY]: {} })).toBe(
      initialState.checkBookQueue,
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

describe('makeSelectCheckBookQueue', () => {
  const checkBookQueueSelector = makeSelectCheckBookQueue();
  it('should select the makeSelectAddingBook', () => {
    const checkBookQueue = 'foo';

    const mockedState = {
      [HOME_PAGE_KEY]: {
        checkBookQueue,
      },
    };
    expect(checkBookQueueSelector(mockedState)).toBe(checkBookQueue);
  });
});
