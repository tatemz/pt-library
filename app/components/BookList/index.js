/**
 *
 * BookList
 *
 */

import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import BookListItem from './BookListItem';
import { BOOK_LIST_PROP_TYPE, CHECK_BOOK_QUEUE_PROP_TYPE } from './constants';

function BookList({ books, handleCheckBook, checkBookQueue }) {
  if (!books || books.length === 0) {
    return null;
  }

  return (
    <Grid container spacing={4}>
      {books.map(book => (
        <Grid key={`book-${book.isbn}`} item md={3}>
          <BookListItem
            book={book}
            handleCheckBook={handleCheckBook}
            isBeingChecked={checkBookQueue.some(
              item => item.book.isbn === book.isbn,
            )}
          />
        </Grid>
      ))}
    </Grid>
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
