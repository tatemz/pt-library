import React from 'react';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import { render } from 'react-testing-library';
import configureStore from '../../../configureStore';
import { checkBook } from '../actions';
import { HomePage, mapDispatchToProps } from '../index';
import { loadLibrary } from '../../App/actions';

describe('<HomePage />', () => {
  let store;

  const renderComponent = props =>
    render(
      <Provider store={store}>
        <HomePage {...props} />
      </Provider>,
    );

  const mockBook = {
    title: 'The Adventures of Foo Bar',
    author: 'Mr. Foo Bar III',
    isbn: '12345678',
    description:
      "Where did 'foo' and 'bar' come from? Find out in this timeless classic.",
    checked: false,
  };

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('should load library on first render', () => {
    const mockLoadLibrary = jest.fn();
    const { rerender } = renderComponent({ loadLibrary: mockLoadLibrary });
    rerender(
      <Provider store={store}>
        <HomePage books={[mockBook]} />
      </Provider>,
    );
    expect(mockLoadLibrary).toHaveBeenCalledTimes(1);
  });

  it('should handle loading state', () => {
    const { getByText } = renderComponent({ libraryLoading: true });
    expect(getByText('Loading...')).toBeTruthy();
  });

  it('should handle error state and output the error message', () => {
    const error = Error('Foo bar');
    const { getByText } = renderComponent({ errors: [error] });
    expect(getByText(error.message)).toBeTruthy();
  });

  it('should render books and match the snapshot', () => {
    const libraryBooks = [mockBook];

    const {
      getByText,
      container: { firstChild },
    } = renderComponent({ libraryBooks });

    expect(getByText(libraryBooks[0].title)).toBeTruthy();
    expect(firstChild).toMatchSnapshot();
  });

  describe('mapDispatchToProps', () => {
    it('should inject loadLibrary and dispatch when called', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      result.loadLibrary();
      expect(dispatch).toHaveBeenCalledWith(loadLibrary());
    });

    it('should inject handleCheckBook and dispatch when called', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      const book = 'Foo';
      result.handleCheckBook(book);
      expect(dispatch).toHaveBeenCalledWith(checkBook(book));
    });
  });
});
