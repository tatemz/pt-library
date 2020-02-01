/**
 *
 * BookList
 *
 */

import React from 'react';
import { BOOK_LIST_PROP_TYPE } from './constants';
// import styled from 'styled-components';

function BookList({ books }) {
  if (!books || books.length === 0) {
    return null;
  }

  return (
    <ul>
      {books.map(({ title, isbn }) => (
        <li key={`book-${isbn}`}>{title}</li>
      ))}
    </ul>
  );
}

BookList.defaultProps = {
  books: [],
};

BookList.propTypes = {
  books: BOOK_LIST_PROP_TYPE,
};

export default BookList;
