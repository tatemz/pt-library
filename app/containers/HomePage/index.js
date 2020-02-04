/* eslint-disable react/no-array-index-key */

/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import BookList from '../../components/BookList';
import {
  BOOK_LIST_PROP_TYPE,
  CHECK_BOOK_QUEUE_PROP_TYPE,
} from '../../components/BookList/constants';
import ErrorMessages from '../../components/ErrorMessages';
import { loadLibrary as loadLibraryAction } from '../App/actions';
import {
  makeSelectErrors,
  makeSelectLibraryBooks,
  makeSelectLibraryLoading,
} from '../App/selectors';
import { checkBook } from './actions';
import { HOME_PAGE_KEY } from './constants';
import reducer from './reducer';
import saga from './saga';
import { makeSelectCheckBookQueue } from './selectors';

export function HomePage({
  errors,
  libraryBooks,
  libraryLoading,
  loadLibrary,
  handleCheckBook,
  checkBookQueue,
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
    <main>
      <Container>
        <ErrorMessages errors={errors} />
        <BookList
          books={libraryBooks}
          handleCheckBook={handleCheckBook}
          checkBookQueue={checkBookQueue}
        />
      </Container>
    </main>
  );
}

HomePage.defaultProps = {
  errors: [],
  libraryBooks: [],
};

HomePage.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.objectOf(Error)),
  libraryBooks: BOOK_LIST_PROP_TYPE,
  libraryLoading: PropTypes.bool,
  loadLibrary: PropTypes.func,
  handleCheckBook: PropTypes.func,
  checkBookQueue: CHECK_BOOK_QUEUE_PROP_TYPE,
};

const mapStateToProps = createStructuredSelector({
  errors: makeSelectErrors(),
  libraryBooks: makeSelectLibraryBooks(),
  libraryLoading: makeSelectLibraryLoading(),
  checkBookQueue: makeSelectCheckBookQueue(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadLibrary: () => dispatch(loadLibraryAction()),
    handleCheckBook: (book, method) => dispatch(checkBook(book, method)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
