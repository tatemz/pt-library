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
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import BookList from '../../components/BookList';
import { BOOK_LIST_PROP_TYPE } from '../../components/BookList/constants';
import ErrorMessages from '../../components/ErrorMessages';
import {
  addBook as addBookAction,
  loadLibrary as loadLibraryAction,
} from './actions';
import { HOME_PAGE_KEY } from './constants';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectAddingBook,
  makeSelectErrors,
  makeSelectLibraryBooks,
  makeSelectLibraryLoading,
} from './selectors';

export function HomePage({
  addBook,
  addingBook,
  errors,
  libraryBooks,
  libraryLoading,
  loadLibrary,
}) {
  useInjectReducer({ key: HOME_PAGE_KEY, reducer });
  useInjectSaga({ key: HOME_PAGE_KEY, saga });

  useEffect(() => {
    if (loadLibrary) loadLibrary();
  }, []);

  if (libraryLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ErrorMessages errors={errors} />
      <BookList books={libraryBooks} />
      <button
        type="button"
        disabled={addingBook}
        onClick={() => !addingBook && addBook && addBook()}
      >
        Add Book
      </button>
    </div>
  );
}

HomePage.defaultProps = {
  errors: [],
  libraryBooks: [],
};

HomePage.propTypes = {
  addBook: PropTypes.func,
  addingBook: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.objectOf(Error)),
  libraryBooks: BOOK_LIST_PROP_TYPE,
  libraryLoading: PropTypes.bool,
  loadLibrary: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  addingBook: makeSelectAddingBook(),
  errors: makeSelectErrors(),
  libraryBooks: makeSelectLibraryBooks(),
  libraryLoading: makeSelectLibraryLoading(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadLibrary: () => dispatch(loadLibraryAction()),
    addBook: book => dispatch(addBookAction(book)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
