import React from 'react';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import { render, fireEvent } from 'react-testing-library';
import configureStore from '../../../configureStore';
import { addBook, loadLibrary } from '../actions';
import { HomePage, mapDispatchToProps } from '../index';

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

  it('should handle loading state', () => {
    const { getByText } = renderComponent({ loading: true });
    expect(getByText('Loading...')).toBeTruthy();
  });

  it('should handle error state and output the error message', () => {
    const error = Error('Foo bar');
    const { getByText } = renderComponent({ error });
    expect(getByText('There was an error loading the library.')).toBeTruthy();
  });

  it('should render books and match the snapshot', () => {
    const books = [mockBook];

    const {
      getByText,
      container: { firstChild },
    } = renderComponent({ books });

    expect(getByText(books[0].title)).toBeTruthy();
    expect(firstChild).toMatchSnapshot();
  });

  it('should add book on button click', () => {
    const mockAddBook = jest.fn();
    const { getByText } = renderComponent({ addBook: mockAddBook });
    const button = getByText('Add Book');
    fireEvent.click(button);
    expect(mockAddBook).toHaveBeenCalledTimes(1);
  });

  it('should disable button when adding book', () => {
    const mockAddBook = jest.fn();
    const { getByText } = renderComponent({
      addBook: mockAddBook,
      addingBook: true,
    });
    const button = getByText('Add Book');
    expect(button.disabled).toBe(true);
    fireEvent.click(button);
    expect(mockAddBook).not.toHaveBeenCalled();
  });

  it('should handle error state and output the error message when adding a new book', () => {
    const addBookError = Error('Foo bar');
    const { getByText } = renderComponent({ addBookError });
    expect(getByText('There was an error adding a new book.')).toBeTruthy();
  });

  describe('mapDispatchToProps', () => {
    it('should inject loadLibrary and dispatch when called', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      result.loadLibrary();
      expect(dispatch).toHaveBeenCalledWith(loadLibrary());
    });

    it('should inject addBook and dispatch when called', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      result.addBook();
      expect(dispatch).toHaveBeenCalledWith(addBook());
    });
  });
});
