/* eslint-disable react/no-array-index-key */

/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import BookList from '../../components/BookList';
import { BOOK_LIST_PROP_TYPE } from '../../components/BookList/constants';
import {
  addBook as addBookAction,
  loadLibrary as loadLibraryAction,
} from './actions';
import { HOME_PAGE_KEY, NEW_BOOK } from './constants';
import reducer from './reducer';

export function HomePage({
  addBook,
  addingBook,
  errors,
  libraryBooks,
  libraryLoading,
  loadLibrary,
}) {
  useInjectReducer({ key: HOME_PAGE_KEY, reducer });

  useEffect(() => {
    if (loadLibrary) loadLibrary();
  }, []);

  if (libraryLoading) {
    return <p>Loading...</p>;
  }

  const errorMessages =
    errors && errors.length > 0 ? (
      <ul>
        {errors.map((e, i) => (
          <li key={`home-error-${i}`}>{e.message}</li>
        ))}
      </ul>
    ) : null;

  return (
    <div>
      {errorMessages}
      <BookList books={libraryBooks} />
      <button
        type="button"
        disabled={addingBook}
        onClick={() => !addingBook && addBook && addBook(NEW_BOOK)}
      >
        Add Book
      </button>
    </div>
  );
}

HomePage.defaultProps = {
  errors: [],
  libraryBooks: [
    {
      title: '1984',
      author: 'George Orwell',
      isbn: '9780451524935',
      description:
        'Written more than 70 years ago, 1984 was George Orwell’s chilling prophecy about the future. And while 1984 has come and gone, his dystopian vision of a government that will do anything to control the narrative is timelier than ever...',
    },
    {
      title: 'Dracula',
      author: 'Bram Stoker',
      isbn: '9780486454016',
      description:
        "During a business visit to Count Dracula's castle in Transylvania, a young English solicitor finds himself at the center of a series of horrifying incidents.",
    },
  ],
};

HomePage.propTypes = {
  addBook: PropTypes.func,
  addingBook: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.objectOf(Error)),
  libraryBooks: BOOK_LIST_PROP_TYPE,
  libraryLoading: PropTypes.bool,
  loadLibrary: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    loadLibrary: () => dispatch(loadLibraryAction()),
    addBook: book => dispatch(addBookAction(book)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
