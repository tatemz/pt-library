import React from 'react';
import { render, fireEvent } from 'react-testing-library';

import BookListItem from '../BookListItem';
import {
  CHECK_BOOK_METHOD_IN,
  CHECK_BOOK_METHOD_OUT,
} from '../../../containers/HomePage/constants';

describe('<BookListItem />', () => {
  const book = {
    title: '1984',
    author: 'George Orwell',
    isbn: '9780451524935',
    description:
      'Written more than 70 years ago, 1984 was George Orwell’s chilling prophecy about the future. And while 1984 has come and gone, his dystopian vision of a government that will do anything to control the narrative is timelier than ever...',
    checked: false,
  };
  const defaultProps = {
    book,
  };

  const renderComponent = (props = defaultProps) =>
    render(<BookListItem {...props} />);

  it('should log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    renderComponent();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should render each book', () => {
    const { getByText } = renderComponent();

    expect(getByText(book.title)).toBeTruthy();
  });

  it('should handle check out click event', () => {
    const mockHandleCheckBook = jest.fn();
    const { getByText } = renderComponent({
      book,
      handleCheckBook: mockHandleCheckBook,
    });
    const button = getByText('Checkout');
    expect(button.disabled).toBeFalsy();
    fireEvent.click(button);
    expect(mockHandleCheckBook).toHaveBeenCalledWith(
      book,
      CHECK_BOOK_METHOD_OUT,
    );
  });

  it('should handle check in click event', () => {
    const mockHandleCheckBook = jest.fn();
    const { getByText } = renderComponent({
      book: { ...book, checked: true },
      handleCheckBook: mockHandleCheckBook,
    });
    const button = getByText('Checkin');
    expect(button.disabled).toBeFalsy();
    fireEvent.click(button);
    expect(mockHandleCheckBook).toHaveBeenCalledWith(
      { ...book, checked: true },
      CHECK_BOOK_METHOD_IN,
    );
  });

  it('should not handle check in/out click event if is currently being processed', () => {
    const mockHandleCheckBook = jest.fn();
    const { getByText } = renderComponent({
      book: { ...book, checked: true },
      handleCheckBook: mockHandleCheckBook,
      isBeingChecked: true,
    });
    const buttonSpan = getByText('Checkin');
    expect(buttonSpan.parentElement.disabled).toBeTruthy();
    fireEvent.click(buttonSpan.parentElement);
    expect(mockHandleCheckBook).not.toHaveBeenCalled();
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it.skip('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = renderComponent();
    expect(firstChild).toMatchSnapshot();
  });
});
