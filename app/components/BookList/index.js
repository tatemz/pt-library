/**
 *
 * BookList
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import BookListItem from './BookListItem';
import { BOOK_LIST_PROP_TYPE, CHECK_BOOK_QUEUE_PROP_TYPE } from './constants';

function BookList({ books, handleCheckBook, checkBookQueue }) {
  if (!books || books.length === 0) {
    return null;
  }

  return (
    <ul>
      {books.map(book => (
        <BookListItem
          key={`book-${book.isbn}`}
          book={book}
          handleCheckBook={handleCheckBook}
          isBeingChecked={checkBookQueue.some(
            item => item.book.isbn === book.isbn,
          )}
        />
      ))}
    </ul>
  );
}

BookList.defaultProps = {
  books: [],
  checkBookQueue: [],
};

BookList.propTypes = {
  books: BOOK_LIST_PROP_TYPE,
  handleCheckBook: PropTypes.func,
  checkBookQueue: CHECK_BOOK_QUEUE_PROP_TYPE,
};

export default BookList;
