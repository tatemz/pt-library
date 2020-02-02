/**
 *
 * BookListItem
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import {
  CHECK_BOOK_METHOD_IN,
  CHECK_BOOK_METHOD_OUT,
} from '../../containers/HomePage/constants';
import { BOOK_PROP_TYPE } from './constants';

function BookListItem({ book, handleCheckBook, isBeingChecked }) {
  return (
    <li>
      {book.title}

      <button
        disabled={isBeingChecked}
        type="button"
        onClick={() =>
          !isBeingChecked &&
          handleCheckBook &&
          handleCheckBook(
            book,
            book.checked ? CHECK_BOOK_METHOD_IN : CHECK_BOOK_METHOD_OUT,
          )
        }
      >
        {book.checked ? 'Checkin' : 'Checkout'}
      </button>
    </li>
  );
}

BookListItem.propTypes = {
  book: BOOK_PROP_TYPE,
  handleCheckBook: PropTypes.func,
  isBeingChecked: PropTypes.bool,
};

export default BookListItem;
