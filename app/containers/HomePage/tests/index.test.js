import React from 'react';
import { render } from 'react-testing-library';
import { browserHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../../../configureStore';
import { HomePage, mapDispatchToProps } from '../index';
import { loadLibrary } from '../actions';

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

  it('should handle loading state', async () => {
    const { findByText } = renderComponent({ loading: true });
    await expect(findByText('Loading...')).resolves.toBeTruthy();
  });

  it('should handle error state and output the error message', async () => {
    const error = Error('Foo bar');
    const { findByText } = renderComponent({ error });
    await expect(
      findByText('There was an error loading the library.'),
    ).resolves.toBeTruthy();
  });

  it('should render books and match the snapshot', async () => {
    const books = [mockBook];

    const {
      findByText,
      container: { firstChild },
    } = renderComponent({ books });

    await expect(findByText(books[0].title)).resolves.toBeTruthy();
    expect(firstChild).toMatchSnapshot();
  });

  describe('mapDispatchToProps', () => {
    it('should inject loadLibrary and dispatch when called', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      result.loadLibrary();
      expect(dispatch).toHaveBeenCalledWith(loadLibrary());
    });
  });
});
